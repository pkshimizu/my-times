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
  useEffect(() => {
    const token = localStorage.getItem("my-times:github:token")
    if (token) {
      setToken(token)
    }
  }, [setToken])
  const handleSave = useCallback(() => {
    if (token) {
      localStorage.setItem("my-times:github:token", token)
    }
    onClose()
  }, [token, onClose])
  return (
    <Dialog open={open}>
      <Flex column>
        <TextField label={"GitHub Private Access Token"} value={token} onChange={setToken} />
        <Flex row>
          <Button onClick={onClose}>閉じる</Button>
          <Button onClick={handleSave}>保存</Button>
        </Flex>
      </Flex>
    </Dialog>
  )
}