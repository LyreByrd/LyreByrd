import Link from "next/link"

const Index = () =>(
  <div>
    <Link href="feed" style={{ fontSize: 40}}>
      {/* <a style={{ fontSize: 40}}>Feed</a> */}
      <div style={{ fontSize: 40}}>Feed</div>
    </Link>
    <h1>
      Welcome to Lyre Byrd
    </h1>
  </div>
)



export default Index