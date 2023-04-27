import MuxPlayer from "@mux/mux-player-react";
import React, { Fragment, useState } from "react";
import "./styles.css";

const cuePoints = [
  {
    time: 0,
    value:
      "Hey everyone, I'm Dylan with Mux, and today we are going to get started with Mux Player."
  },
  {
    time: 6.320666666666667,
    value:
      "Mux Player is a drop in web component for doing video playback with m assets in your web application."
  },
  {
    time: 16.480666666666664,
    value:
      "Let's jump into it. So first I'm gonna start here in the Mux dashboard, you may already have assets in your Mux dashboard, and normally you'd probably be creating assets with API calls."
  },
  {
    time: 28.783944,
    value:
      "But just to speed things up, I'm gonna create one here directly in the dashboard, and I'll just use the default Mux intro video to create that."
  },
  {
    time: 38.98066666666667,
    value:
      "So this is the asset I just created. Now, let's drop in Mux player into a web application that I have."
  },
  {
    time: 47.64066666666667,
    value:
      "So I'm going to need this playback id, so lemme just copy that real quick to my clipboard."
  },
  {
    time: 51.784634,
    value:
      "And if I go here, I have this, a kind of default code sandbox, just plain HTML application."
  },
  {
    time: 60.1,
    value:
      "So first thing I need to do here is install Mux Player as a dependency, and that's @mux slash mux-player on npm."
  },
  {
    time: 70.52066666666667,
    value: "I'm gonna go over to this index. I don't need this code."
  },
  {
    time: 73.68066666666667,
    value: "And then let me just import here @mux mux-player."
  },
  {
    time: 80.692936,
    value:
      "Okay, so now I have imported the package into my HTML and I'm gonna change this to just be an H1 Hello Mux player."
  },
  {
    time: 92.21066666666667,
    value: "Save that. Okay, all set up."
  },
  {
    time: 96.04066666666667,
    value: "Now let's jump over to the Mux player docs here."
  },
  {
    time: 99.74066666666667,
    value: "And in this quick start, see I've already installed it."
  },
  {
    time: 103.2,
    value:
      "This is the HTML code to get started, so I'm just gonna copy that, jump over here and let's just paste that code."
  },
  {
    time: 112.26066666666667,
    value:
      "But I want to use, I'm gonna use this playback ID from the Mux dashboard and just drop that in there."
  },
  {
    time: 119.432332,
    value:
      "Okay, save that. See, that's the asset I just created and right now, that's it."
  },
  {
    time: 126.55066666666667,
    value: "That's everything I have to get to get started."
  },
  {
    time: 128.79066666666668,
    value:
      "Everything's working out of the box and really all I needed was that one playback id, one line of code."
  },
  {
    time: 133.71066666666667,
    value: "And right now I have this fully functional video player."
  },
  {
    time: 135.85066666666668,
    value:
      "You can see on small screens the controls are overlaid on top of the player; as I go to a larger screen, those controls rearrange and shift down the control bar."
  },
  {
    time: 145.488076,
    value:
      "The defaults are all here baked in for you: playback rate, speed up the video, jump forward and jump back by 10 seconds."
  },
  {
    time: 153.96066666666667,
    value:
      "And this would work with a live playback id: if it's a live stream, then you'll get a UI that's live, you set to specify with the stream type that it's live."
  },
  {
    time: 162.04066666666668,
    value:
      "And also Chromecast is enabled by default, so I have a Chromecast connected."
  },
  {
    time: 166.26066666666668,
    value: "I'll see the Chromecast control, airplays enabled by default."
  },
  {
    time: 169.168699,
    value: "Let's actually jump over to Safari to see airplay."
  },
  {
    time: 175.86535,
    value:
      "So we'll load this web app in Safari and you can see I have the airplay control here."
  },
  {
    time: 181.993202,
    value: "So everything you just kind of get all of that out of the box."
  },
  {
    time: 186.27066666666667,
    value:
      "This nice responsive player experience with just that one line of code."
  },
  {
    time: 190.21066666666667,
    value:
      "And again, this is a web component, so it works with any JavaScript framework that you're using to build your application."
  },
  {
    time: 196.636482,
    value:
      "We do also have a Mux player React package, which gives you a React component, which has the same functionality."
  },
  {
    time: 203.45066666666668,
    value:
      "And also notice here that some other nice features is you get the timeline hover previews for your video."
  },
  {
    time: 209.43066666666667,
    value:
      "So as I hover over this video, I can see the little thumbnails popping over the timeline makes it really easy for scrubbing."
  },
  {
    time: 216.717663,
    value: "And notice this metadata."
  },
  {
    time: 219.20066666666668,
    value:
      "So this metadata video title and viewer ID that is actually directly integrated with Mux Data."
  },
  {
    time: 224.41908,
    value:
      "So Mux Data will monitor the video playback experience, quality of experience metrics, so you can make sure that your users are having a good time viewing your video."
  },
  {
    time: 233.26066666666668,
    value:
      "And that's all wired up by default; passing some metadata makes that data more useful. And that's it."
  },
  {
    time: 238.68066666666667,
    value:
      "One line of code. You get all the features of Mux video and Mux data integrated."
  }
];

type CuePoint = { time: number; value: string };
const TranscriptCuePointRenderer = ({
  active = false,
  cuePoint
}: {
  active?: boolean;
  cuePoint: CuePoint;
}) => {
  const { value } = cuePoint;
  return (
    <span className={`transcript-cuepoint${active ? " active" : ""}`}>
      {value}
    </span>
  );
};

const TranscriptRenderer = ({
  activeCuePoint,
  cuePoints = []
}: {
  activeCuePoint?: CuePoint;
  cuePoints: CuePoint[];
}) => {
  return (
    <div className="transcript">
      {cuePoints.map((cuePoint, i) => {
        const spacer = i < cuePoints.length - 1 ? " " : "";
        const active = activeCuePoint?.time === cuePoint.time;
        return (
          <Fragment key={cuePoint.time}>
            <TranscriptCuePointRenderer active={active} cuePoint={cuePoint} />
            {spacer}
          </Fragment>
        );
      })}
    </div>
  );
};

export default function App() {
  const [activeCuePoint, setActiveCuePoint] = useState<CuePoint | undefined>();
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <MuxPlayer
        ref={(playerEl) => {
          playerEl?.addCuePoints(cuePoints);
        }}
        onCuePointChange={({ detail }) => {
          setActiveCuePoint(activeCuePoint);
        }}
        playbackId="jwmIE4m9De02B8TLpBHxOHX7ywGnjWxYQxork1Jn5ffE"
      />
      <TranscriptRenderer
        activeCuePoint={activeCuePoint}
        cuePoints={cuePoints}
      />
    </div>
  );
}
