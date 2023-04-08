import Flex from "@/components/atoms/layouts/flex";
import DatePicker from "@/components/atoms/forms/date-picker";
import {AiFillGithub, AiFillSlackCircle} from "react-icons/ai";
import Button from "@/components/atoms/forms/button";
import ActivityLine from "@/components/organisms/activity-line";
import SlackConnectDialog from "@/components/molecules/slack-connect-dialog";
import {useState} from "react";
import GitHubConnectDialog from "@/components/molecules/github-connect-dialog";

export default function Home() {
  const [githubConnectDialog, setGitHubConnectDialog] = useState<boolean>(false)
  const [slackConnectDialog, setSlackConnectDialog] = useState<boolean>(false)
  return (
    <main>
      <Flex column align={"center"} gap={4}>
        <h1>my times</h1>
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
        <DatePicker />
        <ActivityLine />
      </Flex>
      <GitHubConnectDialog open={githubConnectDialog} onClose={() => setGitHubConnectDialog(false)} />
      <SlackConnectDialog open={slackConnectDialog} onClose={() => setSlackConnectDialog(false)} />
    </main>
  )
}
