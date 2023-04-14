import Card from "@/components/atoms/surfaces/card";
import Flex from "@/components/atoms/layouts/flex";
import {AiFillGithub, AiFillQuestionCircle, AiFillSlackCircle} from "react-icons/ai";
import Label from "@/components/atoms/display/label";
import React from "react";
import Avatar from "@/components/atoms/display/avatar";
import Link from "@/components/atoms/navigations/link";
import TimeLabel from "@/components/atoms/display/time-label";
import {BiGitCommit, BiMessageRounded} from "react-icons/bi";
import {VscGitPullRequest, VscIssues} from "react-icons/vsc";
import Tag from "@/components/atoms/display/tag";

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
      return (
        <Tag color={"green"}>
          <Flex row align={"center"}>
            <VscIssues size={24} />
            <Label text={"Open"} />
          </Flex>
        </Tag>
      )
    case "issue_closed":
      return (
        <Tag color={"purple"}>
          <Flex row align={"center"}>
            <VscIssues size={24} />
            <Label text={"Close"} />
          </Flex>
        </Tag>
      )
    case "issue_comment":
      return (
        <Tag color={"blue"}>
          <Flex row align={"center"}>
            <VscIssues size={24} />
            <Label text={"Comment"} />
          </Flex>
        </Tag>
      )
    case "pull_request_open":
      return (
        <Tag color={"green"}>
          <Flex row align={"center"}>
            <VscGitPullRequest size={24} />
            <Label text={"Open"} />
          </Flex>
        </Tag>
      )
    case "pull_request_merged":
      return (
        <Tag color={"purple"}>
          <Flex row align={"center"}>
            <VscGitPullRequest size={24} />
            <Label text={"Merge"} />
          </Flex>
        </Tag>
      )
    case "pull_request_closed":
      return (
        <Tag color={"gray"}>
          <Flex row align={"center"}>
            <VscGitPullRequest size={24} />
            <Label text={"Close"} />
          </Flex>
        </Tag>
      )
    case "review":
      return (
        <Tag color={"blue"}>
          <Flex row align={"center"}>
            <VscGitPullRequest size={24} />
            <Label text={"Comment"} />
          </Flex>
        </Tag>
      )
    case "commit":
      return (
        <Tag color={"green"}>
          <Flex row align={"center"}>
            <BiGitCommit size={24} />
            <Label text={"Comment"} />
          </Flex>
        </Tag>
      )
    case "message_post":
      return (
        <Tag color={"green"}>
          <Flex row align={"center"}>
            <BiMessageRounded size={24} />
            <Label text={"Post"} />
          </Flex>
        </Tag>
      )
    default:
      return <Label text={type} />
  }
}

export default function ActivityCard({activity}: ActivityCardProps) {
  return (
    <Card width={640}>
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