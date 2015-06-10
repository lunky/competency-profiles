using System.Collections.Generic;
using System.Data.Entity.Migrations;
using cpa.Model;
using cpa.Shared.enums;

namespace cpa.EntityFramework.Migrations
{
	public static class SeedData
	{
		public static void Seed(CpaContext context)
		{
			//  This method will be called after migrating to the latest version.

			context.CompetencyLevels.AddOrUpdate(level => level.Description,
				new CompetencyLevel
				{
					GateLevelDescription = "base",
					Description = "Consultant",
					MinimumScore = 0,
					MinimumGateScore = 0
				});
			context.CompetencyLevels.AddOrUpdate(level => level.Description,
				new CompetencyLevel
				{
					GateLevelDescription = "intermediate",
					Description = "Intermediate",
					MinimumScore = 31,
					MinimumGateScore = 9
				});
			context.CompetencyLevels.AddOrUpdate(level => level.Description,
				new CompetencyLevel
				{
					GateLevelDescription = "senior",
					Description = "Senior",
					MinimumScore = 53,
					MinimumGateScore = 27
				});
			var objectives = new List<Objective>
			{
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Organizes work and manage teams to achieve specific goals or outcomes",
					SupportingExample =
						"Be assigned on a project in a leadership capacity where your responsibilities include creating and assigning tasks to other team members.",
					CounterExample = "Non-lead role on team; independent work; defining work but not actively managing others"
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = true,
					Score = 2,
					GateLevel = GateLevel.senior,
					CompetencyWeighting = 3,
					Description =
						"Actively participates in initiatives that improve Online,  in the development of plans for new business processes, change management, internal projects or programs",
					SupportingExample =
						"Involved in the planning and execution of internal projects or initiatives, Business Planning, Practice Planning, Career Mentor Program",
					CounterExample =
						"Normal project work, personal development projects, involvement in clubs or communities of interest"
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description =
						"Adapts verbal communication (e.g. message, style, level of detail, etc.) based on audience dynamics and feedback",
					SupportingExample =
						"During the course of a presentation be able to identify when your audience isn't understanding your message and modify so that they do. Successfully adapted the messaging of a client presentation on-the-fly that was not being well received. ",
					CounterExample = "Creating a document (Word, email or PPT) for different people (the key is dynamically)."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = true,
					Score = 3,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description = "Assumes a leadership role in the creation of proposal submissions and solution definition",
					SupportingExample =
						"Has been assigned to or taken responsibility for solution definition, bid management, bid authoring or pricing",
					CounterExample =
						"Has elaborated solution details, authored or edited content, provided administrative support for bids"
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = true,
					Score = 3,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Has fulfilled a leadership role in external user groups / professional organizations",
					SupportingExample = "Filled a board role; chaired a committee; played an organizational advisory role",
					CounterExample = "Participant in an organization or committee (even if a key contributor)"
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 1,
					Description = "Assures the practical needs of a team are met (e.g. hardware / tools / SME access / etc.)",
					SupportingExample =
						"Is the person responsible for ensuring the team has the tools necessary to do their job. This could be from working with Infrastructure Services to get accounts and groups setup to talking to Corporate Executive Assistance to get keys and access for members of the team.",
					CounterExample =
						"Advocate for unmet needs, even if loudly enough that needs were addressed. (i.e. Getting a mouse for a co-worker from Infrastructure Services - the key is that while helpful you are not identified as the person responsible for satisfying any non domain specific issues for the team)"
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 1,
					GateLevel = GateLevel.intermediate,
					CompetencyWeighting = 1,
					Description =
						"Creates formulas, styles, tables, references, page layouts, etc. using Microsoft Word and Excel, or other industry standard tools (e.g. OpenOffice, GoogleDocs, etc.)",
					SupportingExample =
						"Designing templates for standard documents with consistent style across deliverables contributed to by multiple people; leveraging more advanced features to produce high quality, professional looking artifacts in Word, e.g. sets of styles linked to outline, consistent tables, customized tables of contents, labeled cross references, sectioned headers and footers in documents with page numbering and logos; leveraging more advanced capabilities in Excel to create solutions that might otherwise require programming, e.g. data filtering, icons, conditional formatting, custom formatting for printing, drop downs, labels, complex formulae with lookups, macros, VBA, charts, pivot tables, etc.",
					CounterExample =
						"Comfort using office tools to create simple, effective documents, spreadsheets, etc.; ability to work with preconfigured styles, e.g. Online Resume or Proposal templates"
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 1,
					GateLevel = GateLevel.intermediate,
					CompetencyWeighting = 1,
					Description =
						"Creates styles, tables, animations, references, page layouts, etc. using PowerPoint or other industry standard tools (e.g. Prezi, Keynote)",
					SupportingExample =
						"Creating templates for standard presentations with consistent style across deliverables contributed to by multiple people or that need to be consistent over time (e.g. dashboards); leveraging more advanced features to produce high impact, professional presentations, e.g. embedded multimedia, transitions, animations / build slides, changing master slides, embedded images from other tools that look good (e.g. Visio models), etc.",
					CounterExample =
						"Comfort using presentation tools to create simple, effective presentations; ability to work with preconfigured styles, e.g. Online Presentation templates"
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description =
						"Effectively determines the appropriate audience with which to communicate (i.e. targets the right individual, group or organizational level)",
					SupportingExample =
						"Understands the dynamics within the client organization and finds the right person from which to solicit information. Actively including / excluding individuals, bypassing expected channels, choosing between business and technical audiences, conscious stakeholder analysis in communication planning.",
					CounterExample =
						"Tailoring messages or language for specific audiences, communicating with senior individuals"
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Clearly communicates expectations to the team and tracks performance against expectations",
					SupportingExample =
						"Team lead that explicitly communicates expectations and addresses deviation. Responsible for explaining the big-picture objectives to the team as well as monitoring the task break-down.",
					CounterExample =
						"Talks to peers about outstanding work and/or writes status reports. Team lead  works around problem team members or issues."
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 1,
					GateLevel = GateLevel.intermediate,
					CompetencyWeighting = 2,
					Description = "Communicates effectively with both technical and non technical resources",
					SupportingExample =
						"Is able to speak in terms that either a technical or non-technical resource can understand. This could include using more every-day type of scenario when attempting to describe a technical process to a less-technical individual (e.g. BA or Sales) or describing the process which is responsible for implementing a requirement when talking to a more technical resource (e.g. developer).",
					CounterExample = "Only comfortable with one or the other. Talking slower, reiterating the same thing."
				},
				new Objective
				{
					Communication = false,
					Leadership = false,
					Interpersonal = true,
					Conflict = false,
					Citizenship = true,
					Score = 2,
					GateLevel = GateLevel.senior,
					CompetencyWeighting = 2,
					Description =
						"Contributes to the creation of internal IP (e.g.. Deliverables, methodologies) and/or initiatives / groups (e.g. book club)",
					SupportingExample =
						"Works with a group of other Onliners to define or create internal IP. Helping to develop a corporate initiative (i.e. Feedback), a methodology (i.e. App Dev Methods), or working with a Practice Lead to further the goals of the practice. ",
					CounterExample =
						"Participating in company events such as Corporate BBQs, Tech Services Events, Study Groups, or delivering Lunch & Learns. Managing multiple priorities/workloads in themselves doesn't qualify- you have to meet deadlines or receive acknowledgement that delays are acceptable."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = true,
					Conflict = true,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description =
						"Deals effectively with changing priorities, workloads and/or multiple client projects with a positive outcome",
					SupportingExample =
						"Is responsible for multiple deliverables within a single time-frame and consistently delivers successfully. Example: working on multiple client engagements/assignments concurrently, or having RFP / internal IP / initiative responsibilities while assigned to a project.",
					CounterExample =
						"Having multiple deliverables on your current project or dealing with clients that change their mind mid-way through the project."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = true,
					Score = 3,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description = "Delivers effective presentations and/or speaks at internal community events ",
					SupportingExample =
						"Prepared and delivered good presentations at Online staff meetings, lunch and learns, or other internal training that receives positive feedback from the audience (either immediately or later through discussion or email).",
					CounterExample =
						"Speaking up or asking questions at staff meetings, supporting role in presentations, delivering an ad-hoc presentation, or speaking at Toastmasters  with (or without) little-to-none positive feedback."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description =
						"Delivers effective presentations at community or industry events (e.g. conferences, speaking engagements)",
					SupportingExample =
						"Delivers an external presentation that receives positive feedback from the audience (either immediately or later through discussion or email).",
					CounterExample =
						"Participates in a discussion with the speaker during a meeting / presentation. Any speaking presentation which would qualify for objective (17)"
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 1,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 1,
					Description = "Demonstrates good judgment in selecting appropriate modes of communication",
					SupportingExample =
						"Understands when to give up on the email exchange and get up and walk over to (or call) the person you're communicating with. Ultimately - understands when email won't cut it anymore, and when email is required to ensure traceability. Chooses between spoken and written communication based on message, potential impact, formality, non-repudiation",
					CounterExample =
						"Ability to communicate effectively across different mediums. Using texts, or unprofessional methods of communication, to tell a client what is going wrong at the client site. "
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 3,
					GateLevel = GateLevel.senior,
					CompetencyWeighting = 2,
					Description =
						"Demonstrates how to take a complex thought/idea and convey it in a clear and concise manner to any audience",
					SupportingExample =
						"Prepares effective solutions / proposals or contrasts subtle differences between alternatives from different viewpoints. This may be creating a PPT with examples / pictures or knowing the right scenarios to use.",
					CounterExample =
						"Having an expectation that audience members to bring enough context with them. Exclude when displaying a bunch of detailed charts, numbers, or graphs, and then not explaining what the relevance of the numbers are. Presentations typically do not remained confined to the meeting in which they were originally scheduled to be delivered. The key to effectively delivering content is knowing what to include and (more importantly) exclude."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 3,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Encourages and facilitates cooperation, open communication and transparency within a team",
					SupportingExample =
						"Ensures that members of the team are aware of issues as well as accolades. Ensuring communication channels are outlined to everyone up front. If in a leadership position, ensuring that the team is aware of how their work is affecting the client and ensuring they are apprised of what is happening within the project from a client / leadership perspective. Actively seeks to plan for and assure inclusive communication on a project; breaks down unnecessary barriers",
					CounterExample =
						"Providing status updates. Protecting the team from issues (the issue can be shared with an explicit understanding that it is informational and that there is no expectation that the team will act on the information). Communicating issues, progress, and praise solely to project executives, stakeholders, and BD without including the team."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description =
						"Expected to lead communication with client, system users, and have direct communication on a regular basis with IT or business managers in either group or one-on-one situations",
					SupportingExample =
						"In a leadership position and is the person the client turns to when they are looking for information (regardless if it's senior business or technical resource). Assumed roles with responsibility for key lines of communication with client participants / stakeholders.",
					CounterExample =
						"Talking with the client resources / SMEs. Effective client, business or end user communication and interactions. Getting approval from more senior Onliners prior to engaging in discussions with clients."
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 1,
					Description =
						"Holds team members accountable for their responsibilities and takes corrective action when necessary",
					SupportingExample =
						"In a leadership position is responsible for following up on assigned deliverables; if those deliverables don't meet expectations or deadlines, working with the resource to develop a strategy to improve and/or change. If, after time, it is clear the resource is incapable of working to expectation then you need to work with project leadership (and / or CMs) to have the resource removed. Has taken progressive steps to correct behavior on a team; escalating concerns over weak contributors that are impacting the team.",
					CounterExample =
						"Talking with the client resources / SMEs. Effective client, business or end user communication and interactions. Getting approval from more senior Onliners prior to engaging in discussions with clients."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 1,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description =
						"Identifies Onliners who appear to be having personal problems and takes appropriate steps to discuss and/or escalate",
					SupportingExample =
						"Proactively intervening when someone seems to be having trouble coping emotionally; sharing concerns about the well-being of others with regional leadership or PeopleCare. Onliners with enough experience to know how to help other Onliners by offering to provide advice or directing them to the appropriate resource.",
					CounterExample =
						"Being aware of issues and working around them, but avoiding getting involved. Noticing that someone is having personal issues and telling them to 'cheer up' or 'things will get better'. Assisting Onliners with personal issues that have been openly discussed with the team / openly acknowledged."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.senior,
					CompetencyWeighting = 1,
					Description = "Identifies required skill sets and selects individuals to accomplish specific tasks",
					SupportingExample =
						"Having the experience to understand how to solve a specific problem and know the abilities of the resources on the project enough to understand who would be capable of working on the task",
					CounterExample =
						"Being aware of issues and working around them, but avoiding getting involved. Noticing that someone is having personal issues and telling them to cheer up or things will get better. Assisting Onliners with personal issues that have been openly discussed with the team / openly acknowledged."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 1,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description = "Identifies when support is required to achieve goals and asks  for support",
					SupportingExample =
						"Onliner proactively asks for help/support before projects, initiatives, deliverables, get off track.",
					CounterExample = "Volunteering a technology, pattern or framework for a technical problem."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 1,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Delivers high level cost or time estimates for planning purposes",
					SupportingExample =
						"Onliner is identified by the client or senior Online resources as someone who has proven their ability to estimate their own time accurately as well as deliver or assist in the creation of estimates for individuals or teams.",
					CounterExample =
						"Provides input or feedback on estimates created by other resources. Providing estimates on remaining work for your current task."
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 3,
					GateLevel = GateLevel.senior,
					CompetencyWeighting = 1,
					Description =
						"Is competent in UML or other industry standards modeling / diagramming techniques that Online uses in project delivery",
					SupportingExample =
						"Understands the different types of diagrams and where they are applicable (e.g. Class, Sequence, Timing, Use Case) and is able to use them to help elicit or clarify requirements",
					CounterExample =
						"Provides input or feedback on estimates created by other resources. Providing estimates on remaining work for your current task. "
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = true,
					Conflict = true,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.intermediate,
					CompetencyWeighting = 3,
					Description = "Is effective at self-managing conflict, issues, and stress ",
					SupportingExample =
						"Doesn't get (noticeably) upset / flustered (including backing down / becoming quiet) when placed in a situation with conflict. Conversely does not become overly aggressive. Is capable of maintaining composure and still meet / manage expectations during high stress situations (e.g. tight deadlines).",
					CounterExample =
						"Communicating with others about the conflict to reduce your own stress levels but not dealing with it head on with the person who is directly involved."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description = "Is persuasive in influencing the decisions, opinions, attitudes and behaviors of the Client",
					SupportingExample =
						"Typically in a leadership role, is responsible for presenting solutions to the client which entail describing how some requirements will be met (which may differ than original expectations). Can demonstrate having presented a client with multiple options or alternatives and had the client's opinion change to match the presented options.",
					CounterExample =
						"Discussing implementation details with a SME. Adamantly insisting your ideas are correct and the client must take your advice or the project will suffer."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description = "Is persuasive in influencing the decisions, opinions, attitudes and behaviors of Onliners",
					SupportingExample =
						"Typically in a leadership role, has demonstrated the ability to get Onliners 'on-board' with a new or unfamiliar idea or process.",
					CounterExample = "Contributing to the creation of IP which is adopted by the organization."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = true,
					Score = 3,
					GateLevel = GateLevel.senior,
					CompetencyWeighting = 4,
					Description = "Is recognized as a mentor to others in crafting both verbal and/or written communications",
					SupportingExample =
						"Is routinely (i.e. more than twice) sought out by Onliners or clients to provide input to their emails, documents, how they should approach a difficult conversation/meeting, or how to plan a senior stakeholder presentation.",
					CounterExample = "Proof reading emails or documents for your team mates"
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = true,
					Conflict = true,
					Citizenship = true,
					Score = 2,
					GateLevel = GateLevel.intermediate,
					CompetencyWeighting = 5,
					Description = "Is requested by Onliners to help them work through client and /or internal issues ",
					SupportingExample =
						"Is routinely (i.e. more than twice) sought out by other Onliners to help with issues either on their project or within Online. Often this is someone in a CM or project leadership role.",
					CounterExample =
						"Providing someone with a SharePoint link or contact information for another senior Onliner."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 3,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Is responsible for and effective at delivering presentations at an executive level",
					SupportingExample =
						"Onliner is the individual responsible for pulling the content together and leading the delivery of the materials to executive that receives positive feedback from the audience (either immediately or later through discussion or email).",
					CounterExample =
						"Participating in the group that developed the material and / or helped deliver the presentation."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 3,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description =
						"Is responsible for delivering presentations at internal community, or project leadership levels",
					SupportingExample = "<self-explanatory>",
					CounterExample = "<self-explanatory>"
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 3,
					GateLevel = GateLevel.senior,
					CompetencyWeighting = 3,
					Description =
						"Is responsible for managing the relationship at all levels within the client, including key senior stakeholders",
					SupportingExample =
						"Onliner is the individual that the client turns to when there are project issues or concerns. A trusted resource: e.g. The client will ask you to interview resources on their behalf.",
					CounterExample =
						"Has a 'good' relationship with the client but ultimately does not impact billable decisions or extensions. Hasn't identified new opportunities for either themselves or other Onliners (resulting in more Onliners getting engaged). Onliners in a staff augmentation role as the only resource would not necessarily meet the Objective."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = true,
					Score = 1,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description = "Is solicited by BD to work on proposals, presentations and other BD related assignments",
					SupportingExample =
						"BD specifically asks you to develop content for them, or speak to a client based on your experience and seniority across multiple roles vs. specifically requesting details about your current or previous role.",
					CounterExample = "Updating your resume with a summary of a project you were on."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = true,
					Score = 2,
					GateLevel = GateLevel.intermediate,
					CompetencyWeighting = 3,
					Description =
						"Is sought out by BD / other consultants to review or correct project proposals / technical documentation / RFPs / architecture documentation / etc.",
					SupportingExample = "<self-explanatory>",
					CounterExample = "<self-explanatory>"
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Is trusted to communicate independently on behalf of Online, both written and verbal",
					SupportingExample =
						"Setting up meetings with external organization, setting up events, participating with BD on sales calls, being the single Onliner on a client-site project",
					CounterExample = "Has one-on-one meetings with  client resources."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 1,
					Description = "Leads and facilitates meetings effectively, including agenda and duration",
					SupportingExample =
						"In a role where you are responsible for planning, scheduling and facilitating a meeting with three or more people. Responsible for ensuring all people are heard and the meeting stays focused. Typically responsible for sending out meeting minutes and following up on any Action Items identified.",
					CounterExample = "Sitting down with a small group and discussing aspects of the project."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Makes a team feel ownership for a project and / or problem to encourage individual investment",
					SupportingExample =
						"Shares details about the project, looks to the team for input and suggestions. Empower people to make decisions (and mistakes). Delegates responsibilities to project team members and encourages them to investigate solutions and provide options.",
					CounterExample =
						"Assign tasks without sharing big picture. 'Protect' team from issues with the client by not sharing what is happening."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = true,
					Conflict = true,
					Citizenship = false,
					Score = 3,
					GateLevel = GateLevel.senior,
					CompetencyWeighting = 3,
					Description = "Mediates pro-actively between individuals to resolve interpersonal conflicts",
					SupportingExample =
						"Is trusted by all parties to diffuse a situation. Is seen as the 'voice of reason' and can find a compromise for all parties. Typically requires someone with some influence being in a leadership position",
					CounterExample =
						"Resolves disagreements, disputes, or low-level questions related to technical approaches for project deliverables. Assists with identifying the best course of action when implementing technical solutions or proof reading documentation."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = true,
					Score = 1,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description = "Participates in external user groups / professional organizations",
					SupportingExample =
						"Participates at least quarterly in external user groups / professional organization events a year.",
					CounterExample = "Attends a user group meeting once."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = false,
					Conflict = true,
					Citizenship = false,
					Score = 3,
					GateLevel = GateLevel.senior,
					CompetencyWeighting = 2,
					Description =
						"Proactively anticipates issues and risks and develops approaches to avoid, mitigate or prepare for them",
					SupportingExample =
						"Leadership  Management effort: Documenting options. Gathering information from the team and balancing against feedback from the client. Employing strategies to identify risks early and often. Provide a comprehensive list of options and suggest the next course of action including pros, cons and reason for selection. Engages senior project resources to vet suggestions put forward by the team. Dealing with Project Level issues (Macro vs. Micro).",
					CounterExample =
						"Communicate issues early and often but missing remediation suggestions. Identifying issues within the task you are assigned and finding work-arounds."
				},
				new Objective
				{
					Communication = true,
					Leadership = false,
					Interpersonal = false,
					Conflict = false,
					Citizenship = true,
					Score = 1,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Provides effective feedback as a way to help others develop",
					SupportingExample =
						"Feedback contains constructive feedback consisting of specific examples and suggestions for improvement or growth. Follows Online's documented Feedback method.",
					CounterExample =
						"Feedback consists of just praise or the area of growth consists of a suggestion with no reason (e.g. Learn more Java)."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 3,
					GateLevel = GateLevel.senior,
					CompetencyWeighting = 2,
					Description = "Recognized as a mentor and leader by senior client team members, and external consultants",
					SupportingExample =
						"Looked to provide guidance to the organization or project. Looked to by the client to take leadership roles within the project. Expected to mentor others (including Onliners and clients).",
					CounterExample = "Being really smart."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = true,
					Score = 1,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Represents and promotes a group's reputation with Online Management and/or the Client",
					SupportingExample =
						"Proactively ensuring your team member’s strengths, accomplishments and commitments  are made known to the client and or OBS Management Team. Giving people the recognition they deserve for the work they have done.",
					CounterExample =
						"Acknowledging the work of others and abstaining from showcasing efforts of the team and / or specific team members"
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = true,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description =
						"Recognizes potential in individuals and facilitates opportunities for their growth and recognition",
					SupportingExample =
						"Recognizing that a developer has an affinity for managing people and tasks, advises that person's CM of the potential for project lead or project management career growth, and follows through with CM, business development, etc. to support that Onliner.",
					CounterExample = "Providing encouragement or feedback during or after an Onliner's engagement with a client."
				},
				new Objective
				{
					Communication = true,
					Leadership = true,
					Interpersonal = true,
					Conflict = true,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 4,
					Description =
						"Rewards effort, hard work, and results; actively promotes high performers and eliminates non-contributors",
					SupportingExample =
						"Ensures that hard work is noticed, acknowledged  and rewarded. It is ensuring that those who are not meeting expectations are aware they are not meeting expectations and that required steps are taken to address this if performance/behavior does not change.",
					CounterExample =
						"Accepting high performers picking up the slack for poor performers . It isn't treating high and low performers the same and not acknowledging  the difference between both."
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = true,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 3,
					Description =
						"Supports the recruiting process by assisting in identifying, attracting, evaluating and recommending qualified people to Online",
					SupportingExample =
						"Participate in recruiting by interviewing or helping at a recruiting event (e.g. at a job faire). Provides detailed evaluations to People care in a timely manner.",
					CounterExample =
						"Forwards a resume for a potential hire to People care. Provides a go/no go call for a candidate with no supporting details"
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = false,
					Conflict = false,
					Citizenship = false,
					Score = 1,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 1,
					Description = "Takes responsibility for outcomes produced by team and takes steps to address shortcomings",
					SupportingExample =
						"Ensures that expectations have been managed so that any outcome is fully anticipated and not a surprise. Proactively focuses on developing alternatives to issues / risks. Takes responsibility for deliverables",
					CounterExample =
						"Explains the problem with the project was due to things like new resources, incomplete requirements, server issues, technology deficiencies. Makes excuses for deliverables"
				},
				new Objective
				{
					Communication = false,
					Leadership = true,
					Interpersonal = true,
					Conflict = false,
					Citizenship = false,
					Score = 2,
					GateLevel = GateLevel.@base,
					CompetencyWeighting = 2,
					Description = "Undertakes, and follows through on additional responsibilities willingly",
					SupportingExample =
						"Volunteers or is requested to work on additional objectives in addition to current assignment AND continues to meet expectations for both.",
					CounterExample =
						"Work on internal IP while on the bench. Works on additional work but routinely misses delivery dates."
				}
			};
			foreach (var objective in objectives)
			{
				context.Objectives.AddOrUpdate(o => o.Description, objective);
			}
		}
	}
}