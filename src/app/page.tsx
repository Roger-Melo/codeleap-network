export default function Home() {
  return (
    <>
      <header>
        <h1>CodeLeap Network</h1>
      </header>
      <main>
        <section>
          <h2>What’s on your mind?</h2>

          <form>
            <div>
              <label>
                Title
                <input type="text" required placeholder="Hello world" />
              </label>
            </div>
            <div>
              <label>
                Content
                <textarea required placeholder="Content here" />
              </label>
            </div>
            <button type="submit">Create</button>
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
    </>
  )
}
