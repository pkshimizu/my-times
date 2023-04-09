import Card from "@/components/atoms/surfaces/card";
import Flex from "@/components/atoms/layouts/flex";
import {AiFillGithub, AiFillQuestionCircle, AiFillSlackCircle} from "react-icons/ai";
import Label from "@/components/atoms/display/label";
import React from "react";
import Avatar from "@/components/atoms/display/avatar";
import DatetimeLabel from "@/components/atoms/display/datetime-label";

type ActivityCardProps = {
  activity: Activity
}

function serviceIcon(service: ServiceName) {
  switch (service) {
    case "github":
      return <AiFillGithub size={'24px'} />
    case "slack":
      return <AiFillSlackCircle size={'24px'} />
    default:
      return <AiFillQuestionCircle size={'24px'} />
  }
}

function activityTypeLabel(type: ActivityType) {
  switch (type) {
    case "create_issue":
      return <Label text={"Issue作成"} />
    case "issue_comment":
      return <Label text={"Issueコメント"} />
    case "pull_request":
      return <Label text={"Pull Request"} />
    case "review":
      return <Label text={"Review"} />
    case "commit":
      return <Label text={"Commit"} />
    default:
      return undefined
  }
}

export default function ActivityCard({activity}: ActivityCardProps) {
  return (
    <Card width={360}>
      <Flex column>
        <Flex row align={"center"}>
          {serviceIcon(activity.service)}
          <DatetimeLabel value={activity.createdAt} />
        </Flex>
        {activity.user && (
          <Flex row align={"center"}>
            <Avatar url={activity.user.imageUrl} alt={"profile"} />
            <Label text={activity.user.name} />
            {activityTypeLabel(activity.type)}
          </Flex>
        )}
        <Flex row>
          <Label text={activity.description} />
        </Flex>
      </Flex>
    </Card>
  )
}