import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { ActionTypes } from "@/lib/types"

type PostFormFooterProps = { actionType: ActionTypes }

export function PostFormFooter({ actionType }: PostFormFooterProps) {
  const { pending } = useFormStatus()
  return actionType === "add"
    ? (
      <div className="flex">
        <Button
          type="submit"
          className="bg-primary-blue ml-auto hover:bg-primary-acqua"
        >
          Create
        </Button>
      </div>
    )
    : (
      <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row sm:justify-end">
        <Button
          disabled={pending}
          type="submit"
          className="bg-primary-green hover:bg-primary-green/90 sm:order-2"
        >
          {pending ? "Updating Post..." : "Save changes"}
        </Button>
        <DialogClose asChild>
          <Button
            disabled={pending}
            type="button"
            variant="secondary"
            className="border border-primary-darkest-gray hover:bg-gray-200 sm:order-1"
          >
            Cancel
          </Button>
        </DialogClose>
      </div>
    )
}
