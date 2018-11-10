import Link from "next/link"

const Index = () =>(
  <div>
    <Link href="feed">
      <a style={{ fontSize: 40}}>Feed</a>
    </Link>
    <Link href="login">
      <a style={{ fontSize: 40}}>Login</a>
    </Link>
    <Link href="signup">
      <a style={{ fontSize: 40}}>Signup</a>
    </Link>
    <h1>
      Welcome to Lyre Byrd
    </h1>
  </div>
)



export default Index