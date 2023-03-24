---
layout: project
title: Automation Scripts
caption: Some Windows scripts I wrote to automate menial tasks
description: >
  Some Windows scripts I wrote to automate menial tasks
date: 24 Mar 2023
image: 
  path: /assets/img/projects/scripts/scripts.webp
  srcset: 
    1920w: /assets/img/projects/scripts/scripts.webp
    580w:  /assets/img/projects/scripts/scripts@0,5x.webp
    360w:  /assets/img/projects/scripts/scripts@0,25x.webp

[//]: # (links:)

[//]: # (  - title: Link)

[//]: # (    url: https://sked24.com/)

sitemap: true
comments: true
---

I'd like to take you on a journey of how I tackled a few problems I faced. In this post, I will dissect two such journeys, covering the problem and the execution. While automation is often intriguing, we'll also assess whether the time and effort spent on automating these tasks were justifiable, by ad~~h~~ering to xkcd's criteria: [https://xkcd.com/1205/](https://xkcd.com/1205/){:target="_blank"}

![Is It Worth the Time?](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)

## Switching sound output devices

### The Problem
Wearing headphones for a prolonged time hurts my ears. Having to connect and disconnect the headphones dongle every time I have a meeting hurts the USB ports and, more importantly, dampens my spirit.

### The Solution
Thankfully, I discovered a suit~~e~~ of PowerShell commands that enable me to control audio devices on Windows with ease: [https://github.com/frgnca/AudioDeviceCmdlets](https://github.com/frgnca/AudioDeviceCmdlets){:target="_blank"}. Searching for other solutions + installing this one took me about **30 minutes**.

One `foreach` later, I had a `ps1` script that can toggle from headphones to speakers and vice-versa:
```
$currentName = (Get-AudioDevice -Playback | Select-Object Name).Name
$g435Name = 'G435 (G435 Wireless Gaming Headset)'
$g435Devices = Get-AudioDevice -List | Where-Object {$_.Name -eq $g435Name}
$speakerName = 'Speakers (Realtek(R) Audio)'
$speakerDevices = Get-AudioDevice -List | Where-Object {$_.Name -eq $speakerName}

# Set devices to all devices that should be changed to
if ( $currentName -eq $g435Name) {
	$devices = $speakerDevices
} else {
	$devices = $g435Devices
}

# Try to set each device until one works
foreach ($device in $devices) {
    try {
        $id = $device.ID
        Set-AudioDevice -ID $id
        return 'Toggled success'
    } catch {
        Write-Host $_
    }
}
```
As one of the first scripts I wrote for PowerShell, this took a longer time than expected, about **1 hour**.

The next step was to bind the script to a key shortcut. This is straightforward in Windows, **30 minutes**:
1. Save the script with the `ps1` extension. Example: `toggleAudio.ps1`
2. Create a shortcut for the powershell executable, usually located in `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`. You do this by Right click -> Send to -> Desktop (create shortcut).
3. Edit the shortcut's properties such that Target is `<location_of_powershell> -ExecutionPolicy Bypass -File <location_of_script_file>`. Example: `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy Bypass -File "path\to\toggleAudio.ps1"`
4. Edit the "Shortcut key" property.

All was well until I realized that the script would occasionally experience a delay of 2-3 seconds after I pressed the key combination. Long story short, I had to remove the Settings App background process. More details here: [https://superuser.com/a/957210](https://superuser.com/a/957210){:target="_blank"}. This was an unfortunate problem that it took way longer to figure out than necessary, approximately **1 hour 30 minutes**.

### Conclusion
So, for a task that I do 5 times a day and saves me 2-3 seconds each time + preserves the laptop's usb ports, I would have broken even if I spent 6 hours on automating this task. It took me about **4**, so I call this a win 🟢!

---

## Changing the brightness of external monitors

### The Problem
As a programmer, I have to take care of my eyes. This means not staring at a bright screen un~~l~~ess it's very sunny outside. I usually need to 1. turn down the brightness of my screens in the morning and 2. turn it up at noon. Doing this for the laptop's screen is easy, but doing it for the external monitor usually means pressing and ho~~l~~ding the on-screen display, which is quite time-consuming.

### The Solution
VCP (VESA (Video Electronics Standards Association) Control Protocol) stands for a type of communication protocol used in computer monitors to control different settings such as brightness, contrast, and color balance. It allows software or scripts to automate the process of adjusting monitor settings or configure them remotely.
So basically, exactly what I needed!
I found this app (bonus points because it's from NirSoft): [https://www.nirsoft.net/utils/control_my_monitor.html](https://www.nirsoft.net/utils/control_my_monitor.html){:target="_blank"} that also allows for command-line options. I do know that there are other apps that do this, but I have tried a few and they either didn't work, or they didn't have a good interface. Implementation with this app was quick:
```
$numbers = 0,1,2,3,4,5,6,7,8,9
$monitorSerialNumber = 'xxxxxxxxxxxxxx'
$brightnessCode = 10
$previousCharacter = -1

while ($true) {
    echo "Monitor Brightness (0 = 0, 1 = 11, 2 = 22, ... 9 = 99): "
    $key = $Host.UI.RawUI.ReadKey()
    $character = $key.Character - 48
    $brightnessValue = ($character/1) * (11/1)
    if ($numbers.Contains($character) -and ($character -ne $previousCharacter)) {
        ControlMyMonitor /SetValue $monitorSerialNumber $brightnessCode $brightnessValue
        $displayMessage = '. Brightness changed to ' + $brightnessValue
        Write-Output $displayMessage
    } else {
        Write-Output '. Done.'
        break
    }
    $previousCharacter = $character
}
```
And with this, I had a script that changes my external monitor brightness based on a digit I input: 0 for 0, 1 for 11, 2 for 22, ..., and 9 for 99.
Following the previous details on how to call scripts based on key shortcuts, now I only have to press a few keys to change the brightness of my external monitor, almost as easy as changing the brightness on my laptop screen. The entire ordeal took me about **1 hour**.

### Conclusion
For a task that I do 2-3 times a day and saves me 5-10 seconds each time, I would have broken even if I spent 10 hours on automating this task. It took me **1**, so I call this a win as well 🟢!

---

## Closing thoughts

In conclusion, through my tw~~o~~ journeys in automating audio and display settings, I hope you've come to realize the value of investing time and effort into problem-solving and automation. 
While the initial setup may take longer than manually performing a task, the long-term benefits are worth it. Not only can automation save time and prevent repetitive strain injuries, but it can also improve efficiency and productivity. 
By following xkcd's criteria and considering the time and effort involved in automating a task, we can ensure that we're making the most of our resources and we're not going overboard with it. 

So, the next time you encounter a problem or a repetitive task, I encourage you to take a step back and consider whether automation may be the solution. Your future self will thank you 🐼.
