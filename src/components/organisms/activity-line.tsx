import ActivityCard from "@/components/molecules/activity-card";
import Flex from "@/components/atoms/layouts/flex";
import {GitHubRepository} from "@/repositories/github-repository";
import {useEffect, useState} from "react";

type ActivityLineProps = {
  date?: string
}

export default function ActivityLine({date}: ActivityLineProps) {
  const [activityHistories, setActivityHistories] = useState<ActivityHistory[]>([])
  useEffect(() => {
    if (date) {
      const datetime = `${date}T00:00:00+09:00`
      const histories: ActivityHistory[] = []
      const githubRepository = new GitHubRepository()
      githubRepository.findIssues(datetime).then(activities => {
        histories.push(
          ...activities.map(activity => ({
            current: activity
          }))
        )
      })
      setActivityHistories(histories)
    }
  }, [date, setActivityHistories])
  return (
    <>
      {activityHistories.map(history => (
        <Flex row gap={4} key={history.current.id}>
          {history.previous ? (
            <ActivityCard activity={history.previous} />
          ) : (
            <div style={{width: '360px'}}></div>
          )}
          <ActivityCard activity={history.current} />
          {history.next ? (
            <ActivityCard activity={history.next} />
          ) : (
            <div style={{width: '360px'}}></div>
          )}
        </Flex>
      ))}
    </>
  )
}