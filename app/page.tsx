import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const Page = async () => {
  let eventList: IEvent[] = [];

  try {
    if (BASE_URL) {
      const response = await fetch(`${BASE_URL}/api/events`, {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        eventList = data.events || [];
      }
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return (
    <section id="home">
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="subheading">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul id="events" className="events list-none">
          {eventList && eventList.length > 0 ? (
            eventList.map((event: IEvent) => (
              <li key={event.slug || String(event._id)}>
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <p className="text-light-200">No events found at the moment.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Page;
