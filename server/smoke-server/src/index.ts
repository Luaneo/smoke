import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  CalendarDay,
  CalendarDayType,
  Cigs,
  Disposable,
  Pods,
  PrismaClient,
  Reason,
  Sex,
} from "@prisma/client";

const prisma = new PrismaClient();

const app = new Hono();
app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// User-related methods

app.post("/user/post/", async (c) => {
  try {
    const data = await c.req.json();
    const newUser = await prisma.user.create({
      data: data,
    });
    return c.json({
      createdUser: newUser,
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        error: e.toString,
      }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
});

app.post("/user/get/", async (c) => {
  try {
    const data: {
      vkId: number;
    } = await c.req.json();
    return c.json(
      await prisma.user.findFirst({
        where: {
          id: data.vkId,
        },
      })
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        error: e.toString,
      }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
});

app.post("/user/register/", async (c) => {
  try {
    const data: {
      vkId: number;
      age?: number;
      sex?: Sex;
      reason: Reason;
    } & (
      | {
          smokeType: "CIGS";
          cigsPerDay: number;
        }
      | {
          smokeType: "PODS";
          juicePerMonth: number;
          vaporizersPerMonth: number;
        }
      | {
          smokeType: "DISPOSABLE";
          disposablePrice: number;
          disposablesPerMonth: number;
        }
    ) = await c.req.json();
    const user = await prisma.user.create({
      data: {
        id: data.vkId,
        smokeType: data.smokeType,
        reason: data.reason,
        cigs:
          data.smokeType === "CIGS"
            ? {
                create: {
                  cigsPerDay: data.cigsPerDay,
                },
              }
            : undefined,
        pods:
          data.smokeType === "PODS"
            ? {
                create: {
                  juicePerMonth: data.juicePerMonth,
                  vaporizersPerMonth: data.vaporizersPerMonth,
                },
              }
            : undefined,
        disposable:
          data.smokeType === "DISPOSABLE"
            ? {
                create: {
                  disposablePrice: data.disposablePrice,
                  disposablesPerMonth: data.disposablesPerMonth,
                },
              }
            : undefined,
      },
    });
    return c.json(user);
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        error: e.toString,
      }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
});

app.post("/user/goal/edit/", async (c) => {
  try {
    const data: {
      vkId: number;
      newGoal: string;
    } = await c.req.json();
    await prisma.user.update({
      where: {
        id: data.vkId,
      },
      data: {
        goal: data.newGoal,
      },
    });
    return new Response(null, {
      status: 200,
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        error: e.toString,
      }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
});

// Homepage-related methods

app.post("/home/get/", async (c) => {
  try {
    const data: {
      vkId: number;
    } = await c.req.json();
    const user = await prisma.user.findFirst({
      where: {
        id: data.vkId,
      },
    });
    if (!user) throw new Error("User not found");
    let smokeData: Cigs | Pods | Disposable | null;
    let moneySaved: number;
    const filter = {
      where: {
        userId: data.vkId,
      },
    };
    const calendar: CalendarDay[] = await prisma.calendarDay.findMany(filter);
    const lastDay = calendar[calendar.length - 1].date;
    const today = new Date();
    const miliDiff = today.getTime() - lastDay.getTime();
    const secDiff = miliDiff / 1000;
    const minDiff = secDiff / 60;
    const hourDiff = minDiff / 60;
    const daysElapsed = Math.floor(hourDiff / 24);
    const hoursElapsed = Math.floor(hourDiff) % 24;
    switch (user.smokeType) {
      case "CIGS":
        smokeData = await prisma.cigs.findFirst(filter);
        if (!smokeData) {
          throw new Error("smokeData not found");
        }
        moneySaved = (((hourDiff / 24) * 150) / 20) * smokeData.cigsPerDay;
        break;
      case "DISPOSABLE":
        smokeData = await prisma.disposable.findFirst(filter);
        if (!smokeData) {
          throw new Error("smokeData not found");
        }
        moneySaved =
          ((hourDiff / 24) *
            smokeData.disposablesPerMonth *
            smokeData.disposablePrice) /
          30;
        break;
      case "PODS":
        smokeData = await prisma.pods.findFirst(filter);
        if (!smokeData) {
          throw new Error("smokeData not found");
        }
        moneySaved =
          ((hourDiff / 24) *
            (400 * smokeData.juicePerMonth +
              300 * smokeData.vaporizersPerMonth)) /
          30;
        break;
      default:
        throw new Error("Unknown user.smokeType");
    }
    return c.json({
      user: user,
      smokeData: smokeData,
      calendar: calendar,
      moneySaved: moneySaved,
      daysElapsed: daysElapsed,
      hoursElapsed: hoursElapsed,
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        error: e.toString,
      }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
});

app.post("/home/health/get/", (c) => {
  return c.json({
    fact1: "foo",
    fact2: "bar",
    fact3: "baz",
  });
});

app.post("/home/calendar/get/", async (c) => {
  try {
    const data: {
      vkId: number;
    } = await c.req.json();
    const calendar = await prisma.calendarDay.findMany({
      where: {
        userId: data.vkId,
      },
    });
    return c.json(calendar);
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        error: e.toString,
      }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
});

app.post("/calendar/post/", async (c) => {
  try {
    const data: {
      vkId: number;
      calendarDayType: CalendarDayType;
    } = await c.req.json();
    await prisma.calendarDay.create({
      data: {
        date: new Date(),
        userId: data.vkId,
        type: data.calendarDayType,
      },
    });
    return new Response(null, {
      status: 200,
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        error: e.toString,
      }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
});

// SmokeAI-related methods

app.post("/groups/post/", async (c) => {
  try {
    const data: {
      vkId: number;
      groupIds: number[];
    } = await c.req.json();
    const newGroups = await prisma.group.createMany({
      data: data.groupIds.map((groupId) => {
        return {
          id: groupId,
          userId: data.vkId,
        };
      }),
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        error: e.toString,
      }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
});

app.post("/predict/", (c) => {
  return c.json({
    prediction1: "Кавказская еда",
    prediction2: "Косметос",
  });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
