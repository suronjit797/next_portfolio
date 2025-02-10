"use client";

import { Button, Result } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <div>
            <Link href="/">
              <Button type="primary">Go to Home</Button>
            </Link>
            <Button variant="outlined" color="blue" className="ml-2"  onClick={()=>router.back()}>Go Back</Button>
          </div>
        }
      />
    </>
  );
}
