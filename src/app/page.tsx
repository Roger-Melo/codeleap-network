import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

function EditIcon() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-white hover:cursor-pointer hover:fill-white/80" viewBox="0 0 26 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.10094 18.2663L11.8385 18.2475L24.3614 6.3225C24.8528 5.85 25.1233 5.2225 25.1233 4.555C25.1233 3.8875 24.8528 3.26 24.3614 2.7875L22.2994 0.805C21.3165 -0.14 19.6016 -0.135 18.6265 0.80125L6.10094 12.7288V18.2663ZM20.461 2.5725L22.5269 4.55125L20.4506 6.52875L18.3886 4.5475L20.461 2.5725ZM8.70122 13.7713L16.5411 6.305L18.6031 8.2875L10.7645 15.7513L8.70122 15.7575V13.7713Z" />
          <path d="M3.50067 23.25H21.7026C23.1367 23.25 24.3029 22.1287 24.3029 20.75V9.91499L21.7026 12.415V20.75H7.6065C7.5727 20.75 7.5376 20.7625 7.50379 20.7625C7.46089 20.7625 7.41798 20.7512 7.37378 20.75H3.50067V3.24999H12.4027L15.003 0.749994H3.50067C2.06661 0.749994 0.900391 1.87124 0.900391 3.24999V20.75C0.900391 22.1287 2.06661 23.25 3.50067 23.25Z" />
        </svg>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>Make changes to your post here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-left">
            <Label className="font-normal" htmlFor="title">Title</Label>
            <Input required id="title" type="text" placeholder="Hello world" autoFocus className="border-primary-darkest-gray" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-normal" htmlFor="content">Content</Label>
            <Textarea required id="content" placeholder="Content here" className="border-primary-darkest-gray" />
          </div>
          <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row sm:justify-end">
            <Button type="submit" className="w-full py-5 bg-primary-green sm:w-32 hover:cursor-pointer hover:bg-primary-green/90 sm:order-2">Save changes</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-full py-5 border border-primary-darkest-gray hover:cursor-pointer hover:bg-gray-200 sm:w-32 sm:order-1">Cancel</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteIcon() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <svg className="w-4 h-5 sm:w-5 sm:h-6 fill-white hover:cursor-pointer hover:fill-white/80" viewBox="0 0 19 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.80087 20.75C1.80087 22.125 2.971 23.25 4.40115 23.25H14.8023C16.2324 23.25 17.4025 22.125 17.4025 20.75V5.75H1.80087V20.75ZM4.99921 11.85L6.83241 10.0875L9.6017 12.7375L12.358 10.0875L14.1912 11.85L11.4349 14.5L14.1912 17.15L12.358 18.9125L9.6017 16.2625L6.84541 18.9125L5.01221 17.15L7.76851 14.5L4.99921 11.85ZM14.1522 2L12.852 0.75H6.35136L5.05122 2H0.500732V4.5H18.7027V2H14.1522Z" />
        </svg>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[600px] md:max-w-[640px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="py-5 hover:cursor-pointer border-primary-dark-gray sm:w-32">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-primary-red py-5 hover:cursor-pointer hover:bg-primary-red/90 sm:w-32">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function Home() {
  return (
    <section className="bg-white mx-auto max-w-[800px] min-h-screen">
      <header className="bg-primary-blue py-8 px-6 border-b border-primary-dark-gray">
        <h1 className="text-xl sm:text-2xl font-bold text-white">CodeLeap Network</h1>
      </header>

      <main className="p-6 flex flex-col gap-6">
        <section className="border border-primary-dark-gray rounded-2xl p-5 flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold">What’s on your mind?</h2>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-left">
              <Label className="font-normal" htmlFor="title">Title</Label>
              <Input required id="title" type="text" placeholder="Hello world" autoFocus className="border-primary-darkest-gray" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-normal" htmlFor="content">Content</Label>
              <Textarea required id="content" placeholder="Content here" className="border-primary-darkest-gray" />
            </div>
            <Button type="submit" className="w-full py-5 bg-primary-blue sm:w-32 ml-auto hover:cursor-pointer hover:bg-primary-acqua">Create</Button>
          </form>
        </section>
        <section>
          <header className="bg-primary-blue rounded-t-2xl p-5 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <h3 className="text-2xl sm:text-2xl font-bold text-white">My First Post at CodeLeap Network!</h3>
            <nav className="sm:flex sm:flex-col sm:justify-center">
              <ul className="flex gap-4 sm:gap-6 justify-end">
                <li><EditIcon /></li>
                <li><DeleteIcon /></li>
              </ul>
            </nav>
          </header>
          <section className="p-5 border border-primary-dark-gray rounded-b-2xl border-t-0 flex flex-col gap-4">
            <div className="text-lg text-primary-darkest-gray">
              <h4 className="font-bold">@Victor</h4>
              <p>
                <time>25</time> minutes ago
              </p>
            </div>
            <article className="text-lg flex flex-col gap-6">
              <p>Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.</p>
              <p>Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.</p>
            </article>
          </section>
        </section>
      </main>
    </section>
  )
}
