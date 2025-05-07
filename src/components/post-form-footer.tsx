import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { type ActionTypes, type PostFormType } from "@/lib/types"

type PostFormFooterProps = {
  actionType: ActionTypes
  formDataState: PostFormType
}

export function PostFormFooter ({ actionType, formDataState }: PostFormFooterProps) {
  const isSomeFieldEmpty = Object.values(formDataState).some((fieldValue) => fieldValue === "")
  return actionType === "add"
    ? (
      <div className="flex">
        <Button
          disabled={isSomeFieldEmpty}
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
          disabled={isSomeFieldEmpty}
          type="submit"
          className="bg-primary-green hover:bg-primary-green/90 sm:order-2"
        >
          Save changes
        </Button>
        <DialogClose asChild>
          <Button
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
