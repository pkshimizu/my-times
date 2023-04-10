import Card from "@/components/atoms/surfaces/card";
import Flex from "@/components/atoms/layouts/flex";
import {AiFillGithub, AiFillQuestionCircle, AiFillSlackCircle} from "react-icons/ai";
import Label from "@/components/atoms/display/label";
import React from "react";
import Avatar from "@/components/atoms/display/avatar";
import Link from "@/components/atoms/navigations/link";
import TimeLabel from "@/components/atoms/display/time-label";

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
    case "issue_open":
      return <Label text={"Issue Open"} />
    case "issue_closed":
      return <Label text={"Issue Closed"} />
    case "issue_comment":
      return <Label text={"Issueコメント"} />
    case "pull_request_open":
      return <Label text={"Pull Request Open"} />
    case "pull_request_merged":
      return <Label text={"Pull Request Merged"} />
    case "pull_request_closed":
      return <Label text={"Pull Request Close"} />
    case "review":
      return <Label text={"Review"} />
    case "commit":
      return <Label text={"Commit"} />
    default:
      return <Label text={type} />
  }
}

export default function ActivityCard({activity}: ActivityCardProps) {
  return (
    <Card width={360}>
      <Link href={activity.url} external>
        <Flex column>
          <Flex row align={"center"}>
            {serviceIcon(activity.service)}
            <TimeLabel value={activity.createdAt} />
          </Flex>
          {activity.user && (
            <Flex row align={"center"}>
              <Avatar url={activity.user.avatarUrl} alt={"profile"} />
              {activityTypeLabel(activity.type)}
            </Flex>
          )}
          <Flex row>
            <Label text={activity.description} />
          </Flex>
        </Flex>
      </Link>
    </Card>
  )
}