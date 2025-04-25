import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  return (
    <section className="bg-white mx-auto max-w-[800px]">
      <header className="bg-primary-blue py-8 px-6 border-b border-primary-dark-gray">
        <h1 className="text-xl sm:text-2xl font-bold text-white">CodeLeap Network</h1>
      </header>

      <main className="p-6">
        <section className="border border-primary-dark-gray rounded-2xl p-5 flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold">What’s on your mind?</h2>

          <form className="flex flex-col gap-4">
            <div>
              <label className="flex flex-col gap-2">
                <span>Title</span>
                <Input required type="text" placeholder="Hello world" autoFocus className="border-primary-darkest-gray" />
              </label>
            </div>
            <div>
              <label className="flex flex-col gap-2">
                <span>Content</span>
                <Textarea required placeholder="Content here" className="border-primary-darkest-gray" />
              </label>
            </div>
            <Button type="submit" className="w-full py-5 bg-primary-blue sm:w-32 ml-auto hover:cursor-pointer hover:bg-primary-green">Create</Button>
          </form>
        </section>

        <section>
          <article>
            <header>
              <h3>My First Post at CodeLeap Network!</h3>
              <nav>
                <ul>
                  <li>Edit Icon</li>
                  <li>Delete Icon</li>
                </ul>
              </nav>
            </header>
            <section>
              <div>
                <h4>@Username</h4>
                <p>
                  <time>00</time> minutes ago
                </p>
              </div>
              <article>
                <p>Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.</p>
                <p>Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.</p>
              </article>
            </section>
          </article>
        </section>
      </main>
    </section>
  )
}
