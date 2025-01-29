import Link from 'next/link'
import { Button, Result } from 'antd';
 
export default function NotFound() {
  return (
    <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Link href='/'> <Button type="primary">Back Home</Button> </Link>}
  />
  )
}