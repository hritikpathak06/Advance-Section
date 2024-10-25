
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-green-500">
      <h1 className=" bg-red-400">Hello world</h1>

      <form
        action={async (formdata: FormData) => {
          "use server";
          try {
            const name = formdata.get("name") as string | undefined;
            const email = formdata.get("email") as string | undefined;
            if (!name || !email) {
              return alert("Please fill all the fields");
            }
            const res = await fetch(
              `${process.env.SERVER_URL}/api/newuser?name=${name}&email=${email}`,
              {
                cache: "no-cache",
              }
            );
            const data = await res.json();
            console.log("Data===>> ", data);
          } catch (error) {
            console.log("Error==>> ", error);
          }
        }}
      >
        <input type="text" placeholder="Name" name="name" required />
        <input type="text" placeholder="Email" name="email" required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
