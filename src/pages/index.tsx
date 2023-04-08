import Flex from "@/components/atoms/layouts/flex";
import DatePicker from "@/components/atoms/forms/date-picker";
import {AiFillGithub, AiFillSlackCircle} from "react-icons/ai";
import Button from "@/components/atoms/forms/button";

export default function Home() {
  return (
    <main>
      <Flex column align={"center"} gap={4}>
        <h1>my times</h1>
        <Flex row>
          <Button>
            <Flex row align={"center"}>
              <AiFillGithub size={"24px"} />
              連携
            </Flex>
          </Button>
          <Button>
            <Flex row align={"center"}>
              <AiFillSlackCircle size={"24px"} />
              連携
            </Flex>
          </Button>
        </Flex>
        <DatePicker />
      </Flex>
    </main>
  )
}
