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
  const [userId, setUserId] = useState<string>()
  const [imageUrl, setImageUrl] = useState<string>()
  useEffect(() => {
    const token = localStorage.getItem("my-times:slack:token")
    if (token) {
      setToken(token)
    }
    const userId = localStorage.getItem("my-times:slack:user-id")
    if (userId) {
      setUserId(userId)
    }
    const imageUrl = localStorage.getItem("my-times:slack:image-url")
    if (imageUrl) {
      setImageUrl(imageUrl)
    }
  }, [setUserId])
  const handleSave = useCallback(() => {
    if (token) {
      localStorage.setItem("my-times:slack:token", token)
    }
    if (userId) {
      localStorage.setItem("my-times:slack:user-id", userId)
    }
    if (imageUrl) {
      localStorage.setItem("my-times:slack:image-url", imageUrl)
    }
    onClose()
  }, [token, userId, imageUrl, onClose])
  return (
    <Dialog open={open}>
      <Flex column>
        <TextField label={"Slack Access Token"} value={token} onChange={setToken} />
        <TextField label={"Slack User ID"} value={userId} onChange={setUserId} />
        <TextField label={"Slack Image URL"} value={imageUrl} onChange={setImageUrl} />
        <Flex row>
          <Button onClick={onClose}>閉じる</Button>
          <Button onClick={handleSave}>保存</Button>
        </Flex>
      </Flex>
    </Dialog>
  )
}