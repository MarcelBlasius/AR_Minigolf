# AR Minigolf
Minigolf Game in Augmented Reality that was developed in a university lecture "Web Engineering".

# Features
* Session Manager
* Image Tracking
* Cross Platform Multiplayer
  * computer in 3D Application
  * Smartphone in Augmented Reality
* Real golf club to interact with virtual ball
* Obstacles
* Scoreboard
* Persistence and Session recovery

# Demo Video
A demo video can be found [here](https://youtu.be/SsqFv-8_IJI)

# Screenshots

![image](https://github.com/MarcelBlasius/AR_Minigolf/assets/64688032/ca692245-0320-4131-b1fc-b6a52eb1a1e2)
![image](https://github.com/MarcelBlasius/AR_Minigolf/assets/64688032/9b875b5a-4068-42d0-a44e-6efb0f29012f)
![image](https://github.com/MarcelBlasius/AR_Minigolf/assets/64688032/2570a1bd-bee1-4585-95cc-9b18f2f4e672)
![image](https://github.com/MarcelBlasius/AR_Minigolf/assets/64688032/99073d72-d438-4c54-b856-9d092a99af43)
![image](https://github.com/MarcelBlasius/AR_Minigolf/assets/64688032/3968fe69-cc78-4522-b792-276a8437f376)

# Requirements:
You have to enable the following chrome flags:
Chrome flags:
Hint: To find chrome flags go to chrome://flags

The following chrome flags need to be adjusted:
* #webxr-incubations -> enable (this is needed by Needle Engine)
* unsafely-treat-insecure-origin-as-secure -> needed because we send http requests from a https context
  * add http://{{database-ip}}:8080 -> needed to access database service
  * add http://{gold_club_ip}}:4200 -> needed to use gold club

Firewall:
* sometimes it is needed to adjust incoming rule to allow port 8080 in the firewall settings to access the database from the smartphone.

# Getting started
* start the database with docker-compose up -d spring
* open unity scene "AR Minigolf" and start it
** A browser window opens once the service is started

# Markers
Markers were created with https://shawnlehner.github.io/ARMaker/ and can be found [here](https://github.com/MarcelBlasius/AR_Minigolf/Assets/Markers)

# Used Assets
* https://assetstore.unity.com/packages/3d/props/exterior/low-poly-fence-pack-61661
* https://assetstore.unity.com/packages/3d/environments/fantasy/lowpoly-baker-s-house-26443
* https://assetstore.unity.com/packages/templates/packs/obstacle-course-pack-178169
* https://assetstore.unity.com/packages/3d/vegetation/trees/free-trees-103208
* https://assetstore.unity.com/packages/3d/vegetation/trees/free-trees-103208
* https://assetstore.unity.com/packages/3d/props/lowpoly-training-dummy-202311
* https://assetstore.unity.com/packages/3d/environments/landscapes/low-poly-simple-nature-pack-162153

# Used Icons
* https://www.svgrepo.com/svg/533733/rotate-exclamation
* https://www.svgrepo.com/svg/522647/rotate-left
* https://www.svgrepo.com/svg/522649/rotate-right
* https://www.svgrepo.com/svg/376004/connected
* https://www.svgrepo.com/svg/311104/plug-disconnected
* https://www.svgrepo.com/svg/441130/circle-arrow-up
* https://www.svgrepo.com/svg/120019/scoreboard
* https://www.svgrepo.com/svg/521653/eye-show

