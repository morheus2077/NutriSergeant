import { Spinner } from "@/components/ui/spinner";


export function Loading(){
    return(
        <div className="flex items-center justify-center h-screen">
            <Spinner className=""/>
        </div>
    )
}