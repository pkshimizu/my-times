import Flex from "@/components/atoms/layouts/flex";
import DatePicker from "@/components/atoms/forms/date-picker";
import {AiFillGithub, AiFillSlackCircle} from "react-icons/ai";
import Button from "@/components/atoms/forms/button";
import ActivityLine from "@/components/organisms/activity-line";
import SlackConnectDialog from "@/components/molecules/slack-connect-dialog";
import {useCallback, useState} from "react";
import GitHubConnectDialog from "@/components/molecules/github-connect-dialog";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";
import Image from "next/image";

export default function Home() {
  const searchParams = useSearchParams()
  const date = searchParams.get('date') ?? undefined
  const router = useRouter()
  const [githubConnectDialog, setGitHubConnectDialog] = useState<boolean>(false)
  const [slackConnectDialog, setSlackConnectDialog] = useState<boolean>(false)

  const handleChangeDate = useCallback((date: string) => {
    void router.push(`/?date=${date}`)
  }, [router])
  return (
    <main className={"p-4"}>
      <Flex column align={"center"} gap={4}>
        <Image src={"/title.png"} alt={"title"} width={291} height={106} />
        <Flex row>
          <Button onClick={() => setGitHubConnectDialog(true)}>
            <Flex row align={"center"}>
              <AiFillGithub size={"24px"} />
              連携
            </Flex>
          </Button>
          <Button onClick={() => setSlackConnectDialog(true)}>
            <Flex row align={"center"}>
              <AiFillSlackCircle size={"24px"} />
              連携
            </Flex>
          </Button>
        </Flex>
        <DatePicker date={date} onChange={handleChangeDate} />
        <ActivityLine date={date} />
      </Flex>
      <GitHubConnectDialog open={githubConnectDialog} onClose={() => setGitHubConnectDialog(false)} />
      <SlackConnectDialog open={slackConnectDialog} onClose={() => setSlackConnectDialog(false)} />
    </main>
  )
}
