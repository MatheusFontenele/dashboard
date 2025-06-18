import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, ShoppingCart, CreditCard, Activity } from "lucide-react"

const metrics = [
  {
    title: "Receita Total",
    value: "R$ 45.231,89",
    change: "+20.1%",
    trend: "up",
    icon: CreditCard,
  },
  {
    title: "Vendas",
    value: "+2.350",
    change: "+180.1%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Clientes Ativos",
    value: "+12.234",
    change: "+19%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Taxa de Conversão",
    value: "3.2%",
    change: "-4.3%",
    trend: "down",
    icon: Activity,
  },
]

export function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {metric.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span> em
              relação ao mês passado
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
