import Dialog from "@/components/atoms/feedback/dialog";
import Flex from "@/components/atoms/layouts/flex";
import Button from "@/components/atoms/forms/button";
import TextField from "@/components/atoms/forms/text-field";
import {useCallback, useEffect, useState} from "react";

type SlackConnectionDialogProps = {
  open: boolean
  onClose: () => void
}

export default function GitHubConnectDialog({open, onClose}: SlackConnectionDialogProps) {
  const [token, setToken] = useState<string>()
  const [owner, setOwner] = useState<string>()
  const [issueRepository, setIssueRepository] = useState<string>()
  const [pullRequestRepository, setPullRequestRepository] = useState<string>()
  useEffect(() => {
    const token = localStorage.getItem("my-times:github:token")
    const owner = localStorage.getItem("my-times:github:owner")
    const issueRepository = localStorage.getItem("my-times:github:issue-repository")
    const pullRequestRepository = localStorage.getItem("my-times:github:pull-request-repository")
    if (token) {
      setToken(token)
    }
    if (owner) {
      setOwner(owner)
    }
    if (issueRepository) {
      setIssueRepository(issueRepository)
    }
    if (pullRequestRepository) {
      setPullRequestRepository(pullRequestRepository)
    }
  }, [setToken])
  const handleSave = useCallback(() => {
    if (token) {
      localStorage.setItem("my-times:github:token", token)
    }
    if (owner) {
      localStorage.setItem("my-times:github:owner", owner)
    }
    if (issueRepository) {
      localStorage.setItem("my-times:github:issue-repository", issueRepository)
    }
    if (pullRequestRepository) {
      localStorage.setItem("my-times:github:pull-request-repository", pullRequestRepository)
    }
    onClose()
  }, [token, owner, issueRepository, pullRequestRepository, onClose])
  return (
    <Dialog open={open}>
      <Flex column>
        <TextField label={"GitHub Private Access Token"} value={token} onChange={setToken} />
        <TextField label={"Target Organization"} value={owner} onChange={setOwner} />
        <TextField label={"Target Issue Repository"} value={issueRepository} onChange={setIssueRepository} />
        <TextField label={"Target Pull Request Repository"} value={pullRequestRepository} onChange={setPullRequestRepository} />
        <Flex row>
          <Button onClick={onClose}>閉じる</Button>
          <Button onClick={handleSave}>保存</Button>
        </Flex>
      </Flex>
    </Dialog>
  )
}