import shortid from "shortid";
import ActivityCard from "@/components/molecules/activity-card";
import Flex from "@/components/atoms/layouts/flex";

export default function ActivityLine() {
  const activityHistories: ActivityHistory[] = [
    {
      current: {
        id: shortid(),
        service: "github",
        user: {
          name: "User1",
          imageUrl: "https://avatars.githubusercontent.com/u/300403?v=4"
        },
        description: "aaaaaaaaaaaa",
        createdAt: "2023-04-01 12:34:56"
      }
    },
    {
      previous: {
        id: shortid(),
        service: "github",
        user: {
          name: "User1",
          imageUrl: "https://avatars.githubusercontent.com/u/300403?v=4"
        },
        description: "aaaaaaaaaaaa",
        createdAt: "2023-04-01 12:34:56"
      },
      current: {
        id: shortid(),
        service: "github",
        user: {
          name: "User1",
          imageUrl: "https://avatars.githubusercontent.com/u/300403?v=4"
        },
        description: "aaaaaaaaaaaa",
        createdAt: "2023-04-01 12:34:56"
      }
    },
    {
      current: {
        id: shortid(),
        service: "github",
        user: {
          name: "User1",
          imageUrl: "https://avatars.githubusercontent.com/u/300403?v=4"
        },
        description: "aaaaaaaaaaaa",
        createdAt: "2023-04-01 12:34:56"
      },
      next: {
        id: shortid(),
        service: "github",
        user: {
          name: "User1",
          imageUrl: "https://avatars.githubusercontent.com/u/300403?v=4"
        },
        description: "aaaaaaaaaaaa",
        createdAt: "2023-04-01 12:34:56"
      },
    },
    {
      previous: {
        id: shortid(),
        service: "github",
        user: {
          name: "User1",
          imageUrl: "https://avatars.githubusercontent.com/u/300403?v=4"
        },
        description: "aaaaaaaaaaaa",
        createdAt: "2023-04-01 12:34:56"
      },
      current: {
        id: shortid(),
        service: "github",
        user: {
          name: "User1",
          imageUrl: "https://avatars.githubusercontent.com/u/300403?v=4"
        },
        description: "aaaaaaaaaaaa",
        createdAt: "2023-04-01 12:34:56"
      },
      next: {
        id: shortid(),
        service: "github",
        user: {
          name: "User1",
          imageUrl: "https://avatars.githubusercontent.com/u/300403?v=4"
        },
        description: "aaaaaaaaaaaa",
        createdAt: "2023-04-01 12:34:56"
      },
    }
  ]
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