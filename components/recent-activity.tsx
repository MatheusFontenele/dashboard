import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    user: "João Silva",
    action: "Fez uma compra",
    amount: "R$ 299,00",
    time: "2 min atrás",
    status: "completed",
  },
  {
    id: 2,
    user: "Maria Santos",
    action: "Cancelou pedido",
    amount: "R$ 150,00",
    time: "5 min atrás",
    status: "cancelled",
  },
  {
    id: 3,
    user: "Pedro Costa",
    action: "Fez uma compra",
    amount: "R$ 450,00",
    time: "10 min atrás",
    status: "completed",
  },
  {
    id: 4,
    user: "Ana Oliveira",
    action: "Solicitou reembolso",
    amount: "R$ 89,00",
    time: "15 min atrás",
    status: "pending",
  },
  {
    id: 5,
    user: "Carlos Lima",
    action: "Fez uma compra",
    amount: "R$ 199,00",
    time: "20 min atrás",
    status: "completed",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>Últimas transações e atividades dos usuários</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-medium">{activity.amount}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge
                  variant={
                    activity.status === "completed"
                      ? "default"
                      : activity.status === "cancelled"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {activity.status === "completed"
                    ? "Concluído"
                    : activity.status === "cancelled"
                      ? "Cancelado"
                      : "Pendente"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
