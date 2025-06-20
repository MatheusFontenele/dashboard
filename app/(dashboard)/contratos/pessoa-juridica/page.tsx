"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  FileText,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Building2,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface Contract {
  id: string
  identification: string
  object: string
  contractor: string
  balance: number
  observations: string[]
  expiresIn: number
  status: "active" | "pending" | "expired" | "completed"
  contractorType: string
  date: string
  value: number
  priority: "high" | "medium" | "low"
}

const mockContracts: Contract[] = [
  {
    id: "1",
    identification: "001.2024.023.2024",
    object: "Aquisição de veículos 0 (zero) km para atender a necessidade da Prefeitura",
    contractor: "NAVESA",
    balance: 85,
    observations: ["Com Itens", "Com Ordem", "Com Anexo(s)"],
    expiresIn: 6,
    status: "active",
    contractorType: "NAVESA",
    date: "2024-01-15",
    value: 250000,
    priority: "high",
  },
  {
    id: "2",
    identification: "0830/2022",
    object: "Contratação de Consultoria e Assessoria Jurídica para Diversas",
    contractor: "CARLOS SERGIO",
    balance: 92,
    observations: ["Com Itens", "Com Ordem", "Com Anexo(s)"],
    expiresIn: 15,
    status: "active",
    contractorType: "CARLOS SERGIO",
    date: "2024-02-01",
    value: 180000,
    priority: "medium",
  },
  {
    id: "3",
    identification: "001.2024.031.2024",
    object: "Contratação de empresa especializada no desenvolvimento de software",
    contractor: "NP TECH",
    balance: 78,
    observations: ["Com Itens", "Com Ordem"],
    expiresIn: 3,
    status: "pending",
    contractorType: "NP TECH",
    date: "2024-03-10",
    value: 320000,
    priority: "high",
  },
  {
    id: "4",
    identification: "002.2024.015.2024",
    object: "Prestação de serviços de manutenção predial e infraestrutura",
    contractor: "GLOBAL SOLUTIONS",
    balance: 100,
    observations: ["Com Itens", "Com Anexo(s)"],
    expiresIn: 30,
    status: "completed",
    contractorType: "GLOBAL SOLUTIONS",
    date: "2024-01-05",
    value: 95000,
    priority: "low",
  },
]

const stats = [
  { title: "Total de Contratos", value: "24", icon: FileText },
  { title: "Contratos Ativos", value: "18", icon: CheckCircle },
  { title: "Vencendo em 7 dias", value: "3", icon: AlertCircle },
  { title: "Valor Total", value: "R$ 2.4M", icon: Building2 },
]

export default function ContractListing() {
  const [selectedContracts, setSelectedContracts] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const [advancedFilters, setAdvancedFilters] = useState({
    dateFrom: "",
    dateTo: "",
    valueMin: "",
    valueMax: "",
    statuses: [] as string[],
    contractors: [] as string[],
    observations: [] as string[],
    priority: "all",
  })
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContracts(mockContracts.map((c) => c.id))
    } else {
      setSelectedContracts([])
    }
  }

  const handleSelectContract = (contractId: string, checked: boolean) => {
    if (checked) {
      setSelectedContracts([...selectedContracts, contractId])
    } else {
      setSelectedContracts(selectedContracts.filter((id) => id !== contractId))
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          label: "Ativo",
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
        }
      case "pending":
        return {
          label: "Pendente",
          color: "bg-yellow-100 text-yellow-800",
          icon: Clock,
        }
      case "expired":
        return {
          label: "Expirado",
          color: "bg-red-100 text-red-800",
          icon: AlertCircle,
        }
      case "completed":
        return {
          label: "Concluído",
          color: "bg-blue-100 text-blue-800",
          icon: CheckCircle,
        }
      default:
        return {
          label: "Desconhecido",
          color: "bg-gray-100 text-gray-800",
          icon: Clock,
        }
    }
  }

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesFilter = statusFilter === "all" || contract.status === statusFilter
    const matchesSearch =
      contract.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.identification.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      dateFrom: "",
      dateTo: "",
      valueMin: "",
      valueMax: "",
      statuses: [],
      contractors: [],
      observations: [],
      priority: "all",
    })
  }

  const applyAdvancedFilters = () => {
    // Here you would apply the advanced filters logic
    setIsFilterModalOpen(false)
  }

  const uniqueContractors = [...new Set(mockContracts.map((c) => c.contractor))]
  const uniqueObservations = [...new Set(mockContracts.flatMap((c) => c.observations))]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contratos - Pessoa Jurídica</h1>
            <p className="text-gray-600 mt-1">Gerencie todos os contratos da organização</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white">
              <Download className="w-4 h-4 mr-2" />
              Gerar Relatório
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Contrato
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <stat.icon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por identificação, objeto ou contratado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="completed">Concluídos</SelectItem>
                    <SelectItem value="expired">Expirados</SelectItem>
                  </SelectContent>
                </Select>

                <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtros Avançados
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Filtros Avançados</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {/* Date Range */}
                      <div>
                        <Label className="text-sm font-semibold text-gray-900 mb-3 block">Período</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="dateFrom" className="text-sm text-gray-600">
                              Data Inicial
                            </Label>
                            <Input
                              id="dateFrom"
                              type="date"
                              value={advancedFilters.dateFrom}
                              onChange={(e) => setAdvancedFilters({ ...advancedFilters, dateFrom: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="dateTo" className="text-sm text-gray-600">
                              Data Final
                            </Label>
                            <Input
                              id="dateTo"
                              type="date"
                              value={advancedFilters.dateTo}
                              onChange={(e) => setAdvancedFilters({ ...advancedFilters, dateTo: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Value Range */}
                      <div>
                        <Label className="text-sm font-semibold text-gray-900 mb-3 block">Faixa de Valor</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="valueMin" className="text-sm text-gray-600">
                              Valor Mínimo
                            </Label>
                            <Input
                              id="valueMin"
                              type="number"
                              placeholder="R$ 0,00"
                              value={advancedFilters.valueMin}
                              onChange={(e) => setAdvancedFilters({ ...advancedFilters, valueMin: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="valueMax" className="text-sm text-gray-600">
                              Valor Máximo
                            </Label>
                            <Input
                              id="valueMax"
                              type="number"
                              placeholder="R$ 999.999,99"
                              value={advancedFilters.valueMax}
                              onChange={(e) => setAdvancedFilters({ ...advancedFilters, valueMax: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Status Multiple Selection */}
                      <div>
                        <Label className="text-sm font-semibold text-gray-900 mb-3 block">
                          Status (múltipla seleção)
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: "active", label: "Ativo" },
                            { value: "pending", label: "Pendente" },
                            { value: "completed", label: "Concluído" },
                            { value: "expired", label: "Expirado" },
                          ].map((status) => (
                            <div key={status.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={status.value}
                                checked={advancedFilters.statuses.includes(status.value)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setAdvancedFilters({
                                      ...advancedFilters,
                                      statuses: [...advancedFilters.statuses, status.value],
                                    })
                                  } else {
                                    setAdvancedFilters({
                                      ...advancedFilters,
                                      statuses: advancedFilters.statuses.filter((s) => s !== status.value),
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={status.value} className="text-sm text-gray-700">
                                {status.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Contractors */}
                      <div>
                        <Label className="text-sm font-semibold text-gray-900 mb-3 block">Contratados</Label>
                        <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                          {uniqueContractors.map((contractor) => (
                            <div key={contractor} className="flex items-center space-x-2">
                              <Checkbox
                                id={contractor}
                                checked={advancedFilters.contractors.includes(contractor)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setAdvancedFilters({
                                      ...advancedFilters,
                                      contractors: [...advancedFilters.contractors, contractor],
                                    })
                                  } else {
                                    setAdvancedFilters({
                                      ...advancedFilters,
                                      contractors: advancedFilters.contractors.filter((c) => c !== contractor),
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={contractor} className="text-sm text-gray-700">
                                {contractor}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Priority */}
                      <div>
                        <Label className="text-sm font-semibold text-gray-900 mb-3 block">Prioridade</Label>
                        <Select
                          value={advancedFilters.priority}
                          onValueChange={(value) => setAdvancedFilters({ ...advancedFilters, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas as Prioridades</SelectItem>
                            <SelectItem value="high">Alta</SelectItem>
                            <SelectItem value="medium">Média</SelectItem>
                            <SelectItem value="low">Baixa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      {/* Observations */}
                      <div>
                        <Label className="text-sm font-semibold text-gray-900 mb-3 block">Observações</Label>
                        <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                          {uniqueObservations.map((observation) => (
                            <div key={observation} className="flex items-center space-x-2">
                              <Checkbox
                                id={observation}
                                checked={advancedFilters.observations.includes(observation)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setAdvancedFilters({
                                      ...advancedFilters,
                                      observations: [...advancedFilters.observations, observation],
                                    })
                                  } else {
                                    setAdvancedFilters({
                                      ...advancedFilters,
                                      observations: advancedFilters.observations.filter((o) => o !== observation),
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={observation} className="text-sm text-gray-700">
                                {observation}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="flex justify-between pt-4 border-t">
                      <Button variant="outline" onClick={resetAdvancedFilters}>
                        Limpar Filtros
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsFilterModalOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={applyAdvancedFilters} className="bg-blue-600 hover:bg-blue-700">
                          Aplicar Filtros
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 text-left w-12">
                      <Checkbox
                        checked={selectedContracts.length === mockContracts.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Identificação</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Objeto</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Contratado</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Valor</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Vencimento</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Observações</th>
                    <th className="p-4 text-center text-sm font-semibold text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredContracts.map((contract, index) => {
                    const statusConfig = getStatusConfig(contract.status)
                    const StatusIcon = statusConfig.icon
                    const isExpiringSoon = contract.expiresIn <= 7
                    const isEvenRow = index % 2 === 0

                    return (
                      <tr
                        key={contract.id}
                        className={`${isEvenRow ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                      >
                        <td className="p-4">
                          <Checkbox
                            checked={selectedContracts.includes(contract.id)}
                            onCheckedChange={(checked) => handleSelectContract(contract.id, checked as boolean)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{contract.identification}</span>
                            <span className="text-xs text-gray-500">{contract.date}</span>
                          </div>
                        </td>
                        <td className="p-4 max-w-xs">
                          <p className="text-sm text-gray-900 line-clamp-2">{contract.object}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">{contract.contractor}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={`${statusConfig.color} border-0`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-medium text-gray-900">
                            {contract.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span
                              className={`text-sm ${isExpiringSoon ? "text-red-600 font-medium" : "text-gray-600"}`}
                            >
                              {contract.expiresIn} dias
                            </span>
                            {isExpiringSoon && <AlertCircle className="w-4 h-4 text-red-500" />}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {contract.observations.slice(0, 2).map((obs, index) => (
                              <Badge key={index} className="bg-gray-100 text-gray-700 border-0 text-xs">
                                {obs}
                              </Badge>
                            ))}
                            {contract.observations.length > 2 && (
                              <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">
                                +{contract.observations.length - 2}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <FileText className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <RotateCcw className="w-4 h-4 mr-2" />
                                  Renovar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Baixar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">4</span> de{" "}
            <span className="font-medium">24</span> resultados
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>
            <div className="flex gap-1">
              <Button variant="default" size="sm" className="w-8 h-8">
                1
              </Button>
              <Button variant="outline" size="sm" className="w-8 h-8">
                2
              </Button>
              <Button variant="outline" size="sm" className="w-8 h-8">
                3
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Próximo
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
