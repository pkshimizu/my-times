import Dialog from "@/components/atoms/feedback/dialog";
import Flex from "@/components/atoms/layouts/flex";
import Button from "@/components/atoms/forms/button";
import TextField from "@/components/atoms/forms/text-field";
import {useCallback, useEffect, useState} from "react";

type SlackConnectionDialogProps = {
  open: boolean
  onClose: () => void
}

export default function SlackConnectDialog({open, onClose}: SlackConnectionDialogProps) {
  const [token, setToken] = useState<string>()
  useEffect(() => {
    const token = localStorage.getItem("my-times:slack:token")
    if (token) {
      setToken(token)
    }
  }, [setToken])
  const handleSave = useCallback(() => {
    if (token) {
      localStorage.setItem("my-times:slack:token", token)
    }
    onClose()
  }, [token, onClose])
  return (
    <Dialog open={open}>
      <Flex column>
        <TextField label={"Slack Access Token"} value={token} onChange={setToken} />
        <Button onClick={handleSave}>保存</Button>
      </Flex>
    </Dialog>
  )
}