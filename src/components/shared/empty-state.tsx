import { Sparkle } from "lucide-react"

interface Props {
  title?: string
  description?: string
}

const EmptyState = ({
  title = "No chat selected",
  description = "Pick a chat or start a new one to send and receive messages.",
}: Props) => {
  return (
    <div className="flex flex-1 items-center justify-center bg-mut h-full border-t border-r border-b">
      <div className="flex flex-col items-center text-center gap-3 max-w-md px-4">
        
        <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center shadow-sm">
          <Sparkle className="w-6 h-6 text-purple-500" />
        </div>

        <h2 className="text-2xl font-medium text-muted-foreground">
          {title}
        </h2>

        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          {description}
        </p>

      </div>
    </div>
  )
}

export default EmptyState
