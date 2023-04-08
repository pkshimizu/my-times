import Flex from "@/components/atoms/layouts/flex";
import DatePicker from "@/components/atoms/forms/date-picker";

export default function Home() {
  return (
    <main>
      <Flex column align={"center"}>
        <h1>my times</h1>
        <DatePicker />
      </Flex>
    </main>
  )
}
