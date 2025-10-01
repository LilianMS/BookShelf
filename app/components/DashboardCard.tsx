import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
  valueColor: string;
  descriptionColor?: string;
  icon?: React.ReactNode;
}

export default function DashboardCard({
  title,
  value,
  description,
  valueColor,
  descriptionColor = "text-muted-foreground",
  icon
}: DashboardCardProps) {
  return (
    <Card className="relative p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card border-border overflow-hidden group">
      {/* Gradiente de fundo sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/10 opacity-50" />
      
      <div className="relative">
        {/* Header com ícone e título */}
        <CardHeader className="pb-3 px-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg text-card-foreground font-semibold">
              {title}
            </CardTitle>
            {icon && (
              <div className={`flex-shrink-0 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-background to-muted/20 ${valueColor} group-hover:scale-110 transition-transform duration-300`}>
                {icon}
              </div>
            )}
          </div>
        </CardHeader>

        {/* Conteúdo principal */}
        <CardContent className="px-0 space-y-2">
          <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${valueColor} mb-1 tracking-tight`}>
            {value}
          </p>
          <p className={`text-xs sm:text-sm ${descriptionColor} leading-relaxed`}>
            {description}
          </p>
        </CardContent>

        {/* Indicador de interação */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-500 rounded-full" />
      </div>
    </Card>
  );
}