"use client"

import { useState } from "react"
import {
  Users,
  Shield,
  Settings,
  Activity,
  Plus,
  Edit,
  Trash2,
  Search,
  MoreHorizontal,
  UserPlus,
  Key,
  Database,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data
const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@empresa.com",
    role: "Admin",
    status: "Ativo",
    lastLogin: "2024-01-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@empresa.com",
    role: "Editor",
    status: "Ativo",
    lastLogin: "2024-01-14",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@empresa.com",
    role: "Viewer",
    status: "Inativo",
    lastLogin: "2024-01-10",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Acesso total ao sistema",
    users: 1,
    permissions: ["all"],
  },
  {
    id: 2,
    name: "Admin",
    description: "Gerenciamento de usuários e configurações",
    users: 2,
    permissions: ["users.manage", "settings.edit", "reports.view"],
  },
  {
    id: 3,
    name: "Editor",
    description: "Pode editar conteúdo e visualizar relatórios",
    users: 5,
    permissions: ["content.edit", "reports.view"],
  },
  {
    id: 4,
    name: "Viewer",
    description: "Apenas visualização",
    users: 12,
    permissions: ["reports.view"],
  },
]

const permissions = [
  { id: "users.manage", name: "Gerenciar Usuários", category: "Usuários" },
  { id: "users.create", name: "Criar Usuários", category: "Usuários" },
  { id: "users.edit", name: "Editar Usuários", category: "Usuários" },
  { id: "users.delete", name: "Excluir Usuários", category: "Usuários" },
  { id: "settings.edit", name: "Editar Configurações", category: "Sistema" },
  { id: "settings.view", name: "Ver Configurações", category: "Sistema" },
  { id: "reports.view", name: "Ver Relatórios", category: "Relatórios" },
  { id: "reports.export", name: "Exportar Relatórios", category: "Relatórios" },
  { id: "content.edit", name: "Editar Conteúdo", category: "Conteúdo" },
  { id: "content.publish", name: "Publicar Conteúdo", category: "Conteúdo" },
]

export default function AdminSettings() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  })
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateUser = () => {
    console.log("Creating user:", newUser)
    setIsCreateUserOpen(false)
    setNewUser({ name: "", email: "", role: "", password: "" })
  }

  const handleCreateRole = () => {
    console.log("Creating role:", newRole)
    setIsCreateRoleOpen(false)
    setNewRole({ name: "", description: "", permissions: [] })
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: checked ? [...prev.permissions, permissionId] : prev.permissions.filter((p) => p !== permissionId),
    }))
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Configurações de Administrador</h1>
        <p className="text-muted-foreground mt-2">Gerencie usuários, permissões e configurações do sistema</p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Permissões
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Auditoria
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gerenciamento de Usuários</CardTitle>
                  <CardDescription>Adicione, edite e gerencie usuários do sistema</CardDescription>
                </div>
                <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Adicionar Usuário
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Criar Novo Usuário</DialogTitle>
                      <DialogDescription>Preencha as informações para criar um novo usuário</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Digite o nome completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="usuario@empresa.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Função</Label>
                        <Select
                          value={newUser.role}
                          onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma função" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Senha Temporária</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                          placeholder="Senha temporária"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateUser}>Criar Usuário</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar usuários..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as funções</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Login</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Ativo" ? "default" : "destructive"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="mr-2 h-4 w-4" />
                              Redefinir Senha
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gerenciamento de Permissões</CardTitle>
                  <CardDescription>Configure funções e permissões do sistema</CardDescription>
                </div>
                <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Nova Função
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Criar Nova Função</DialogTitle>
                      <DialogDescription>Defina uma nova função e suas permissões</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="roleName">Nome da Função</Label>
                        <Input
                          id="roleName"
                          value={newRole.name}
                          onChange={(e) => setNewRole((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Ex: Moderador"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="roleDescription">Descrição</Label>
                        <Input
                          id="roleDescription"
                          value={newRole.description}
                          onChange={(e) => setNewRole((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Descreva as responsabilidades desta função"
                        />
                      </div>
                      <div className="space-y-4">
                        <Label>Permissões</Label>
                        <div className="max-h-60 overflow-y-auto space-y-4">
                          {Object.entries(
                            permissions.reduce(
                              (acc, permission) => {
                                if (!acc[permission.category]) {
                                  acc[permission.category] = []
                                }
                                acc[permission.category].push(permission)
                                return acc
                              },
                              {} as Record<string, typeof permissions>,
                            ),
                          ).map(([category, categoryPermissions]) => (
                            <div key={category} className="space-y-2">
                              <h4 className="font-medium text-sm">{category}</h4>
                              <div className="space-y-2 pl-4">
                                {categoryPermissions.map((permission) => (
                                  <div key={permission.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={permission.id}
                                      checked={newRole.permissions.includes(permission.id)}
                                      onCheckedChange={(checked) =>
                                        handlePermissionChange(permission.id, checked as boolean)
                                      }
                                    />
                                    <Label htmlFor={permission.id} className="text-sm">
                                      {permission.name}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateRole}>Criar Função</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {roles.map((role) => (
                  <Card key={role.id} className="border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Ver Usuários
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {role.users} usuário{role.users !== 1 ? "s" : ""}
                        </span>
                        <Badge variant="outline">
                          {role.permissions.length} permiss{role.permissions.length !== 1 ? "ões" : "ão"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Configurações do Sistema
                </CardTitle>
                <CardDescription>Configurações gerais da aplicação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Registro de Usuários</Label>
                    <p className="text-sm text-muted-foreground">Permitir auto-registro de novos usuários</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Verificação de Email</Label>
                    <p className="text-sm text-muted-foreground">Exigir verificação de email para novos usuários</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Tempo de Sessão (minutos)</Label>
                  <Select defaultValue="60">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="240">4 horas</SelectItem>
                      <SelectItem value="480">8 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Configurações Globais
                </CardTitle>
                <CardDescription>Configurações que afetam todo o sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Idioma Padrão</Label>
                  <Select defaultValue="pt-br">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                      <SelectItem value="en-us">English (US)</SelectItem>
                      <SelectItem value="es-es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fuso Horário</Label>
                  <Select defaultValue="america-sao_paulo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-sao_paulo">América/São Paulo</SelectItem>
                      <SelectItem value="america-new_york">América/Nova York</SelectItem>
                      <SelectItem value="europe-london">Europa/Londres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tema Padrão</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Log de Auditoria</CardTitle>
              <CardDescription>Histórico de ações realizadas no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: "João Silva",
                    action: "Criou usuário",
                    target: "maria@empresa.com",
                    timestamp: "2024-01-15 14:30:25",
                    ip: "192.168.1.100",
                  },
                  {
                    user: "Maria Santos",
                    action: "Alterou permissões",
                    target: "Função Editor",
                    timestamp: "2024-01-15 13:15:10",
                    ip: "192.168.1.101",
                  },
                  {
                    user: "João Silva",
                    action: "Login realizado",
                    target: "Sistema",
                    timestamp: "2024-01-15 09:00:00",
                    ip: "192.168.1.100",
                  },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">
                        <span className="text-blue-600">{log.user}</span> {log.action.toLowerCase()}{" "}
                        <span className="font-semibold">{log.target}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {log.timestamp} • IP: {log.ip}
                      </p>
                    </div>
                    <Badge variant="outline">{log.action}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
