import { WelcomeToLens } from "./WelcomeToLens";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export default function page() {
    return (
        <div className=" h-svh flex justify-center items-center ">
            
            <Card className="max-w-[400px] ">
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="/lens/Icon-T-Green_@2x.png"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">连接 Lens 登入界面</p>
                        <p className="text-small text-default-500">Lens Protocol</p>
                    </div>
                </CardHeader>
                <Divider />


                <CardBody>
                    <WelcomeToLens />
                </CardBody>


{/*                 <Divider />
                <CardFooter>
                    <Link
                        isExternal
                        showAnchorIcon
                        href="/Signup"
                    >
                        注册账号
                    </Link>
                </CardFooter> */}
            </Card>



        </div>
    )
}
