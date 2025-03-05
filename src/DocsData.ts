interface IDocsDataHeader {
   title: string,
   imageURL: string,
   lastUpdated: string,
   headerContent: string,
};

interface ISectionContent {
   sectionid: string;
   sectionHeader: string,
   sectionContent: string,
}

export const DocsDataHeader : IDocsDataHeader = {
   title: "Tag and Snap Docs",
   imageURL: "/src/assets/placeholder.jpeg",
   lastUpdated: "Last Updated: 3 March 2025",
   headerContent:
   `
   <ul>
      <li><a href="#summary">Summary</a></li>
      <li><a href="#units">Units</a></li>
      <li><a href="#basics">Basics</a></li>
      <li><a href="#challenges">Challenges</a></li>
      <li><a href="#abilities>"Abilities</a></li>
      <li><a href="#rules">Rules</a></li>
      <li><a href="#usefullinks">Useful Links</a></li>
    </ul>
   `,
}

export const SectionContent : ISectionContent[] = [{
   sectionid: "summary",
   sectionHeader: "Summary",
   sectionContent: `<p>Lele please work on this</p>`,
}, {
   sectionid:  "units",
   sectionHeader: "Units",
   sectionContent: 
      `<p>Players are put into <yellow>units</yellow> and act together as a single player.</p><p>Players in <yellow>units</yellow> move together, tag, and get tagged together.</p>
<p>(From now on, <red>Runner</red> / <blue>Seeker</blue> means <red>Runner</red> / <blue>Seeker</blue> unit)</p>
<p>When any member of a <blue>Runner unit</blue> is tagged via a photo, the entire unit becomes a <red>Seeker unit.</red></p>
`,
}, {
   sectionid: "basics",
   sectionHeader: "Basics",
   sectionContent: `<p>The locations of the <blue>Runners</blue> and <red>Seekers</red> are always publicly revealed, via Whatsapp Live Location.</p>
<p>At the start of the game, there is a 10 minute grace period where <red>Seekers cannot move</red>.</p><p>After the grace period, <blue>Runners</blue> have <yellow>25 minutes</yellow> with their location on, followed by <yellow>10 minutes</yellow> location off.</p> 
<p>During location off, <blue>Runners</blue> must meet up and <yellow>send a selfie</yellow>.</p>
<p>This cycle <yellow>repeats</yellow> until the game ends. (4x)</p>
<p>The game lasts <yellow>2 hours and 20 minutes.</yellow></p><p>If any <blue>Runner</blue> remains uncaught by the end of the game, the <blue>Runners win</blue>; if <red>all</red> are caught, the <red>Seekers win</red>.</p>`,
}, {
   sectionid: "challenges",
   sectionHeader: "Challenges",
   sectionContent: `<p>There are <yellow>3 public challenges</yellow> at all times.</p>
<p>When a challenge is completed, it is <yellow>randomly replaced</yellow> by one of its kind.</p>
<p>Normal and hard challenges, when completed, <yellow>yield “Location Off” minutes</yellow>.</p>
<p>On the other hand, easy challenges, when completed, <yellow>reroll</yellow> all the challenges.</p>
<p><yellow>Announce</yellow> that you are attempting the challenge before attempting.</p>
`,
}, {
   sectionid: "abilities",
   sectionHeader: "Abilities",
   sectionContent: `<p>Abilities add an extra layer of depth to the game.</p>
<p>They can only be acquired/used under certain conditions, and have varying cooldowns.</p>
<p><red>Transport (Seekers Only)</p>
<p>Seekers have <yellow>full access to public transport</yellow> whenever they like. (No cooldown)</p>
<p><red>Panorama (Seekers Only)</p>
<p>A specified <blue>Runner</blue> must publicly send a panorama of their <yellow>surroundings</yellow> and the <yellow>floor level</yellow> they are on the moment they are notified.</p>
<p>Each <red>Seeker</red> starts the game with <yellow>4 uses</yellow>. Tagged <blue>Runners</blue> also get <yellow>4 uses</yellow>. It cannot be further obtained. (No cooldown)</p>
<p>Panoramas are <yellow>360 degree</yellow> photos.</p>
<p>When a panorama is used, <blue>Runners</blue> must remain at the location where the panorama is taken for <yellow>15 seconds</yellow>.</p>
<p>“Location Off” Minutes (both <blue>Runners</blue> and <red>Seekers</red>)</p>
<p>Units can turn off their location at the cost of their Minutes (No cooldown, can be stored).</p>
<p>Minutes are earned via challenges.</p>
<p>Using/obtaining abilities must be made <yellow>publicly known</yellow>.</p>
<p>Example of using a Panorama:</p>
<div style="position: relative; display: flex; flex-direction: row; justify-content: left; height: 55px; width: 280px; margin-left: 20px;">
<div style="background-color: lightgreen; width: 100%; height: 100%; border-radius: 14px;">
<p style="font-family: Helvetica Neue; color: black; padding: 5px 15px; line-height: 1.4; font-size: 1rem; letter-spacing: 0px; font-weight: 400;">I'm using a Panorama on unit XYZ. I have 2 Panoramas left.</p>
<p style="position: absolute; top: 33px; left: 178px; font-size: 0.8rem; color: grey; width: 80px;">9:41 AM</p>
<p style="position: absolute; top: 32px; left: 232px; font-size: 0.9rem; color: grey; letter-spacing: -7px;">✓✓</p>
</div>
</div>
<p style="padding-top: 10px";>Example of completing a Challenge:</p>  
<div style="position: relative; display: flex; flex-direction: row; justify-content: left; height: 55px; width: 350px; margin-left: 20px;">
<div style="background-color: lightgreen; width: 100%; height: 100%; border-radius: 14px;">
<p style="font-family: Helvetica Neue; color: black; padding: 5px 15px; line-height: 1.4; font-size: 1rem; letter-spacing: 0px; font-weight: 400; margin-right: 75px;">I've completed "Challenge ABC". I now have X location off minutes.</p>
<p style="position: absolute; top: 33px; left: 248px; font-size: 0.8rem; color: grey; width: 80px;">1:69 AM</p>
<p style="position: absolute; top: 32px; left: 302px; font-size: 0.9rem; color: #4FB6EC; letter-spacing: -7px;">✓✓</p>
</div>
</div>
`,
}, {
   sectionid: "rules",
   sectionHeader: "Rules",
   sectionContent: `
   <ul>
   <li><p>Play in a <yellow>safe area</yellow> at all times.</p></li>
   <li><p>Follow all <yellow>laws</yellow>.</p></li>
   <li><p>Play in <yellow>free, publicly accessible</yellow> areas only.</p></li>
   <li><p>Do not <yellow>leave</yellow> the boundaries or play area. if you do, <yellow>return as soon as possible</yellow>.</p></li>
   <li><p>Players in a unit must stick together.</p></li>
   <li><p><red>Seekers</red> can split up only <yellow>within a single building</yellow>.</p></li>
   <li><p>As a <blue>Runner</blue>, refrain from using hiding as a strategy.</p></li>
   <li><p>In the event of using the toilet, at least <yellow>one</yellow> person from the unit must be <yellow>outside</yellow>.</p></li> 
   <li><p>Do not exploit your outfit for an advantage in the game (wearing shades, hoodies, masks, etc...)</p></li>
   <li><p>Do not cause <yellow>unnecessary disturbance</yellow> to the people around you.</p></li>
   </ul>
   <h2><b>Fair Play Rules</b></h2>
   <ul>
   <p>Prohibited Tactics: (<blue>Runner</blue>)</p>
   <li><p>Players must not use strategies that make them <yellow>impossible</yellow> or <yellow>excessively difficult</yellow> to find, such as hiding in inaccessible locations.</p></li>
   <li><p>No <yellow>tampering with mechanics</yellow> of the game, messing with location settings, etc.</p></li>
   <p>Permitted Strategies: (<blue>Runner</blue>/<red>Seeker</red>)</p>
   <li><p><yellow>Creative</yellow> and <yellow>strategic</yellow> play is encouraged. Players can use <yellow>tactics</yellow> like faking out opponents, taking unexpected routes, or hiding in unconventional yet accessible places.</p></li>
   <li><p>If a <blue>Runner</blue> becomes stuck, the <red>Seeker</red> has 15 minutes to prompt them to move; otherwise, the <blue>Runner</blue> will be deemed caught.</p></li> 
   <li><p>No <yellow>external help</yellow>.</p></li>
   <li><p>Riding bikes, skateboards, cars, or any other mobility aids is prohibited.</p></li>
   <li><p>Use common sense, play fair, and have fun!</p></li>
   </ul>

   
   `,
}, {
   sectionid: "usefullinks",
   sectionHeader: "Useful Links",
   sectionContent: 
      `<ul>
         <li><a href="https://earth.google.com/earth/d/1Soq45EjW1PscqvDnLmajCZafm9XeokG_?usp=sharing">Play Area (Google Earth)</a></li>
      </ul>
      `
   ,
}]

