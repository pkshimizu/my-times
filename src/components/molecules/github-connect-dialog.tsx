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
  useEffect(() => {
    const token = localStorage.getItem("my-times:github:token")
    const owner = localStorage.getItem("my-times:github:owner")
    const issueRepository = localStorage.getItem("my-times:github:issue-repository")
    if (token) {
      setToken(token)
    }
    if (owner) {
      setOwner(owner)
    }
    if (issueRepository) {
      setIssueRepository(issueRepository)
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
    onClose()
  }, [token, owner, issueRepository, onClose])
  return (
    <Dialog open={open}>
      <Flex column>
        <TextField label={"GitHub Private Access Token"} value={token} onChange={setToken} />
        <TextField label={"Target Organization"} value={owner} onChange={setOwner} />
        <TextField label={"Target Repository"} value={issueRepository} onChange={setIssueRepository} />
        <Flex row>
          <Button onClick={onClose}>閉じる</Button>
          <Button onClick={handleSave}>保存</Button>
        </Flex>
      </Flex>
    </Dialog>
  )
}