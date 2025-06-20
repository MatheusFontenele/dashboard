import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, ShoppingCart, CreditCard, Activity, ArrowRight } from "lucide-react"

const metrics = [
  {
    title: "Receita Total",
    value: "R$ 45.231,89",
    change: "+20.1%",
    trend: "up",
    icon: CreditCard,
    color: "bg-green-500",
  },
  {
    title: "Vendas",
    value: "+2.350",
    change: "+180.1%",
    trend: "up",
    icon: ShoppingCart,
    color: "bg-blue-500",
  },
  {
    title: "Clientes Ativos",
    value: "+12.234",
    change: "+19%",
    trend: "up",
    icon: Users,
    color: "bg-yellow-500",
  },
  {
    title: "Taxa de Conversão",
    value: "3.2%",
    change: "-4.3%",
    trend: "down",
    icon: Activity,
    color: "bg-red-500",
  },
]

export function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index} className={`${metric.color} overflow-hidden flex flex-col justify-between`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-4">
            <CardTitle className="text-sm font-medium text-white">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" color="white"/>
          </CardHeader>
          <CardContent className="text-white">
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 text-gray-200">
              {metric.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-gray-200" />
              ) : (
                <TrendingDown className="h-3 w-3 text-gray-200" />
              )}
              <span className={metric.trend === "up" ? "text-gray-200" : "text-gray-200"}>{metric.change} em
              relação ao mês passado</span>
            </p>
          </CardContent>
          <CardFooter className={`text-xs text-white bg-black/20 py-2`}> 
            <a href="" className="flex-1">
              <div className="justify-between flex items-center ">
                <span>Ver mais</span>
                <ArrowRight className="inline h-3 w-3" />
              </div>
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
