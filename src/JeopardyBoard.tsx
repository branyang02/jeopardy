import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "./hooks/use-toast";
import { Input } from "./components/ui/input";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

// Types
type Team = {
  id: number;
  name: string;
  score: number;
  emoji?: string;
};

type Question = {
  question: string;
  answer: string;
  value: number;
  isAnswered: boolean;
  image?: string;
};

type Category = {
  name: string;
  questions: Question[];
};

// Helper function to generate random emoji
const getRandomEmoji = (): string => {
  const emojis = [
    "🦊",
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦝",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🐔",
    "🦄",
    "🐲",
    "🦖",
    "🦕",
    "🐢",
    "🐙",
    "🦑",
    "🦞",
    "🦀",
    "🐠",
    "🐬",
    "🐳",
    "🦈",
    "🦜",
    "🦢",
    "🦩",
    "🦚",
    "🦉",
    "🦅",
    "🦇",
    "🐺",
    "🐗",
    "🐴",
    "🦓",
    "🦍",
    "🐘",
    "🦛",
    "🦏",
    "🐪",
    "🐆",
    "🐅",
    "🐊",
    "🦧",
    "🐒",
    "🦘",
  ];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

// Sample data structure
const initialCategories: Category[] = [
  {
    name: "🇰🇷 👩",
    questions: [
      {
        question: "Jane's favorite color",
        answer: "What is green?",
        value: 200,
        isAnswered: false,
      },
      {
        question:
          "The name of Jane's favorite member of a boy band from her motherland.",
        answer: "Who is Jin?",
        value: 400,
        isAnswered: false,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1200px-Flag_of_South_Korea.svg.png",
      },
      {
        question: "The names of Jane's two siblings.",
        answer: "Who are Sharon and Brian?",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Jane's dog breed (hint: mix of two).",
        answer: "What is Australian shepherd and labrador retriever mix?",
        value: 800,
        isAnswered: false,
      },
      {
        question:
          "The date of Jane's half marathon that she is currently training for.",
        answer: "April 5, 2025",
        value: 1000,
        isAnswered: false,
        image:
          "https://www.roadid.com/cdn/shop/articles/marathon-runners-blurred.jpg?v=1613687381&width=1500",
      },
      {
        question: "Everyone that Jane has pinned on her iPhone messages.",
        answer: "What is `no one`?",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "Jane wanted to be this when she was little.",
        answer: "What is a Supreme Court Justice?",
        value: 1400,
        isAnswered: false,
      },
      {
        question:
          "If you were to ask Jane, “how was your day?”, what response is she most likely to give you?",
        answer: "What is 'mid'?",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
  {
    name: "🇨🇳 ‍👦",
    questions: [
      {
        question: "Brandon was born on this day.",
        answer: "What is 03/05/2002?",
        value: 200,
        isAnswered: false,
      },
      {
        question: "Brandon's Chinese name.",
        answer: "Yifan (杨奕帆)",
        value: 400,
        isAnswered: false,
      },
      {
        question: "The number of cats Brandon has.",
        answer: "What is 0?",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Brandon's favorite item in the kitchen.",
        answer: "What is a cast iron skillet?",
        value: 800,
        isAnswered: false,
      },
      {
        question: "Brandon's car make and model.",
        answer: "What is Honda CRV?",
        value: 1000,
        isAnswered: false,
      },
      {
        question: "Brandon's favorite credit card.",
        answer: "What is Chase Sapphire?",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "Brandon went to high school in this Virginia city.",
        answer: "What is Lynchburg?",
        value: 1400,
        isAnswered: false,
      },
      {
        question: "Brandon started snowboarding at this age.",
        answer: "What is 14?",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
  {
    name: "The Algorithm Decides",
    questions: [
      {
        question:
          "This YouTube megastar made history by becoming the first content creator to surpass 500 million subscribers, beating mainstream networks.",
        answer: "Who is MrBeast?",
        value: 200,
        isAnswered: false,
      },
      {
        question:
          "The position of the NFL superstar, #87 on the KC Chiefs, who is in a relationship with Taylor Swift.",
        answer: "What is tight end?",
        value: 400,
        isAnswered: false,
        image:
          "https://people.com/thmb/n4vLDLBjBQoFw6A9NIFSgXu3-e8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(669x298:671x300)/Taylor-Swift-celebrates-with-Travis-Kelce-87-of-the-Kansas-City-Chiefs-after-defeating-the-Buffalo-Bills-012725-tout-ce7a282b3ed34611b7525c9d89f83aab.jpg",
      },
      {
        question:
          "Donald Trump misspelled this word for coffee in a tweet back in May of 2017.",
        answer: "What is covfefe?",
        value: 600,
        isAnswered: false,
        image:
          "https://assets.editorial.aetnd.com/uploads/2016/11/donald-trump-gettyimages-687193180.jpg",
      },
      {
        question:
          "This woman is married to Ellen Degeneres, the talk show host who recently had her show canceled.",
        answer: "Who is Portia?",
        value: 800,
        isAnswered: false,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Ellen_DeGeneres_2011.jpg/800px-Ellen_DeGeneres_2011.jpg",
      },
      {
        question:
          "The TikTok star who released a song called 'Be Happy' and has a sister who is also a TikTok star.",
        answer: "Who is Dixie D'Amelio?",
        value: 1000,
        isAnswered: false,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Charli_D%27Amelio_3.jpg/1280px-Charli_D%27Amelio_3.jpg",
      },
      {
        question: "The most streamed song globally on Spotify in 2024.",
        answer: "What is 'Espresso' by Sabrina Carpenter?",
        value: 1200,
        isAnswered: false,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png",
      },
      {
        question:
          "This English translation of viral Thai pygmy hippo Moo Deng's name refers to a springy piece of meat.",
        answer: "What is 'Bouncy Pork'?",
        value: 1400,
        isAnswered: false,
        image:
          "https://www.ramaponews.com/wp-content/uploads/sites/10/2024/09/Moo-Deng_moodengx_X-3.jpg",
      },
      {
        question:
          "This infamous 1990s hip-hop feud between east and west coast in the U.S. was personified by two iconic rappers, both of whom met tragic ends through gun violence—one in Las Vegas in 1996 and the other in Los Angeles in 1997, leaving behind legendary musical legacies that continue to influence the genre decades later.",
        answer: "What is Tupac Shakur vs. The Notorious B.I.G.?",
        value: 1600,
        isAnswered: false,
        image:
          "https://images.pushsquare.com/2b4645da41fb2/gta-san-andreas-ps2-soapbox-1.900x.jpg",
      },
    ],
  },
  {
    name: "Borderline Ridiculous",
    questions: [
      {
        question:
          "The famous European city that was divided by a wall until 1989, separating East and West.",
        answer: "What is Berlin?",
        value: 200,
        isAnswered: false,
        image:
          "https://cdn.britannica.com/39/6839-050-27891400/Brandenburg-Gate-Berlin.jpg",
      },
      {
        question:
          "This New England state is the only state in the U.S. with just one bordering state.",
        answer: "What is Maine?",
        value: 400,
        isAnswered: false,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1200px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png",
      },
      {
        question:
          "The curious Kentucky Bend, an isolated 18-square-mile exclave completely separated from the rest of the Bluegrass State, owes its unusual geography to being nearly encircled by this major American waterway, which shares its name with a Southern U.S. state.",
        answer: "What is the Mississippi River?",
        value: 600,
        isAnswered: false,
      },
      {
        question:
          "This transcontinental country straddles both Europe and Asia, with its most famous city uniquely spanning two continents, divided by the Bosporus Strait.",
        answer: "What is Turkey?",
        value: 800,
        isAnswered: false,
        image:
          "https://www.allrecipes.com/thmb/k90ckVa4vHelGuzL5XFlYQ91Myo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/43655-perfect-turkey-ddmfs-2x1-0713-20c92a1527684e69987a53952450a3c9.jpg",
      },
      {
        question:
          "The longest undefended border in the world is shared between these two countries.",
        answer: "What are the United States and Canada?",
        value: 1000,
        isAnswered: false,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/f/f3/49_parallel_waterton.jpg",
      },
      {
        question:
          "This tiny European country, landlocked between Switzerland and Austria, has no military and is known for being a tax haven.",
        answer: "What is Liechtenstein?",
        value: 1200,
        isAnswered: false,
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/bb/a6/df/liechtenstein-is-a-25km.jpg?w=700&h=700&s=1",
      },
      {
        question:
          "These two neighboring island nations in the Southern Hemisphere, both former British colonies, are known for their unique wildlife, rugby rivalry, and shared historical ties to the Commonwealth.",
        answer: "What are Australia and New Zealand?",
        value: 1400,
        isAnswered: false,
        image:
          "https://www.usatoday.com/gcdn/authoring/authoring-images/2024/07/24/USAT/74526372007-2162671238.jpg?crop=3790,2132,x0,y126",
      },
      {
        question:
          "Separated by less than three miles of water, these two countries are the closest bordering nations that do not share a land border.",
        answer: "What are Russia and the United States?",
        value: 1600,
        isAnswered: false,
        image:
          "https://cdn.britannica.com/59/124859-004-904DAF30/Little-Diomede-Island-Big-Bering-Strait.jpg",
      },
    ],
  },
  {
    name: "Mathletes Unite!",
    questions: [
      {
        question: "This is the only even prime number.",
        answer: "What is 2?",
        value: 200,
        isAnswered: false,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2yg5CsAdCgpfZD6bfr2bEcGol_oBmR1OYFg&s=",
      },
      {
        question: "This number is the 15th digit of pi (including 3 in 3.14).",
        answer: "What is 9?",
        value: 400,
        isAnswered: false,
        image:
          "https://media.wired.com/photos/65e87484612cb5ee54e73d9c/4:3/w_6864,h_5148,c_limit/gettyimages-875606854.jpg",
      },
      {
        question:
          "This mathematical function is unique because its derivative is identical to the function itself.",
        answer: "What is the exponential function?",
        value: 600,
        isAnswered: false,
        image:
          "https://www.ms.uky.edu/ma109/studentguide/external/Exponentials/ExpGrowth.png",
      },
      {
        question:
          "The total measure of all interior angles in a four-sided polygon is this many degrees.",
        answer: "What is 360?",
        value: 800,
        isAnswered: false,
        image:
          "https://i.etsystatic.com/34041246/r/il/d40a60/5805041959/il_fullxfull.5805041959_k3qf.jpg",
      },
      {
        question:
          "This fundamental trigonometric identity states that for any angle θ, sin²θ + cos²θ is always equal to this value.",
        answer: "What is 1?",
        value: 1000,
        isAnswered: false,
      },
      {
        question:
          "This continuous probability distribution, also known as the 'bell curve,' is used to model many real-world phenomena such as heights and test scores.",
        answer: "What is the normal distribution?",
        value: 1200,
        isAnswered: false,
        image: "https://www.nlm.nih.gov/oet/ed/stats/img/Distribution_14.png",
      },
      {
        question:
          "This integration technique follows the formula ∫ u dv = uv - ∫ v du.",
        answer: "What is integration by parts?",
        value: 1400,
        isAnswered: false,
        image:
          "https://www.mathsisfun.com/calculus/images/integral-parts-ex-x.svg",
      },
      {
        question: "This is the sum of all integers from 1 to 100.",
        answer: "What is 5050?",
        value: 1600,
        isAnswered: false,
        image:
          "https://media.istockphoto.com/id/1328395253/vector/hundred-points-emoji-icon.jpg?s=612x612&w=0&k=20&c=zy2NI8jM4FQhOuIqv4EfkqRvLamb-DeL4DDhqBKsS74=",
      },
    ],
  },
  {
    name: "Gap Fillers ___",
    questions: [
      {
        question: "The early bird catches the ___.",
        answer: "worm",
        value: 200,
        isAnswered: false,
        image:
          "https://blogs.missouristate.edu/international/files/2020/09/early_bird.jpg",
      },
      {
        question: "A penny saved is a penny ___.",
        answer: "earned",
        value: 400,
        isAnswered: false,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/2/2e/US_One_Cent_Obv.png",
      },
      {
        question: "Just a small-town girl, living in a lonely ___.",
        answer: "world",
        value: 600,
        isAnswered: false,
        image:
          "https://buynebraska.com/cdn/shop/products/HEARTLandia_48.png?v=1662827067",
      },
      {
        question:
          "Mama, just killed a ___. Put a gun against his head, pulled my trigger now he's dead.",
        answer: "man",
        value: 1400,
        isAnswered: false,
        image:
          "https://cdn.britannica.com/38/200938-050-E22981D1/Freddie-Mercury-Live-Aid-Queen-Wembley-Stadium-July-13-1985.jpg",
      },
      {
        question: "Look at all those ___.",
        answer: "chickens",
        value: 1000,
        isAnswered: false,
        image:
          "https://i.ytimg.com/vi/IR37Q1zY2Xc/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgYig8MA8=&rs=AOn4CLACvPRPxgsA5SYiT18uAj6R0eFn9g",
      },
      {
        question: "___.",
        answer: "sus",
        value: 1200,
        isAnswered: false,
        image: "https://i1.sndcdn.com/artworks-iojqrmj2DmZO-0-t500x500.jpg",
      },
      {
        question: "What's 9 + 10? ___.",
        answer: "21",
        value: 1400,
        isAnswered: false,
        image: "https://i.ytimg.com/vi/BzVXbeASRiQ/mqdefault.jpg",
      },
      {
        question:
          "I understand, you got a hunnid bands. You got a baby Benz, you got some bad friends. High school pics, ___ ___ ____ ___ ____.",
        answer: "you was even bad then",
        value: 1600,
        isAnswered: false,
        image:
          "https://media.newyorker.com/photos/66d0e1a0dbfcd564cf6b198b/master/w_2560%2Cc_limit/Brickner-Wood-Drake.jpg",
      },
    ],
  },
  {
    name: "Mad Scientist Lab",
    questions: [
      {
        question: "What is the largest organ on the human body?",
        answer: "What is the skin?",
        value: 200,
        isAnswered: false,
      },
      {
        question: "What does DNA stand for?",
        answer: "What is deoxyribonucleic acid?",
        value: 400,
        isAnswered: false,
      },
      {
        question: "Name a mammal that lays eggs.",
        answer: "What is a platypus?",
        value: 600,
        isAnswered: false,
      },
      {
        question: "What is the largest planet in our solar system?",
        answer: "What is Jupiter?",
        value: 800,
        isAnswered: false,
      },
      {
        question: "What percentage of the earth is covered in Water?",
        answer: "What is 71%?",
        value: 1000,
        isAnswered: false,
      },
      {
        question: "How many elements are in the periodic table?",
        answer: "What is 118?",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "What is the largest desert in the world?",
        answer: "What is Antarctica?",
        value: 1400,
        isAnswered: false,
      },
      {
        question:
          "What is the process called when a solid directly turns into a gas?",
        answer: "What is sublimation?",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
  {
    name: "Livin' in the PAST",
    questions: [
      {
        question:
          "What was the name of the landmark Supreme Court case that ruled the racial segregation of schools unconstitutional?",
        answer: "Brown v. Board of Education",
        value: 200,
        isAnswered: false,
      },
      {
        question: "Who was the fourth president of the United States?",
        answer: "Who is James Madison?",
        value: 400,
        isAnswered: false,
      },
      {
        question: "Who was the first black Supreme Court justice?",
        answer: "Who is Thurgood Marshall?",
        value: 600,
        isAnswered: false,
      },
      {
        question: "Who wrote the Iliad?",
        answer: "Who is Homer?",
        value: 800,
        isAnswered: false,
      },
      {
        question: "Who were the main combatants in the Peloponnesian War?",
        answer: "Athens and Sparta",
        value: 1000,
        isAnswered: false,
      },
      {
        question:
          "What is the real name of the founder of Buddhism, commonly known as the Buddha?",
        answer: "Who is Siddhartha Gautama?",
        value: 1200,
        isAnswered: false,
      },
      {
        question: "What date was the Declaration of Independence adopted?",
        answer: "What is July 4, 1776?",
        value: 1400,
        isAnswered: false,
      },
      {
        question:
          "How much land and how many mules were promised to freed slaves during Reconstruction?",
        answer: "What is 40 acres and a mule?",
        value: 1600,
        isAnswered: false,
      },
    ],
  },
];

const initialTeams: Team[] = [
  { id: 1, name: "Team 1", score: 0, emoji: getRandomEmoji() },
  { id: 2, name: "Team 2", score: 0, emoji: getRandomEmoji() },
  { id: 3, name: "Team 3", score: 0, emoji: getRandomEmoji() },
  { id: 4, name: "Team 4", score: 0, emoji: getRandomEmoji() },
];

const JeopardyBoard = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleScoreEdit = (teamId: number, newScore: string) => {
    const score = parseInt(newScore) || 0;
    setTeams(
      teams.map((team) => (team.id === teamId ? { ...team, score } : team))
    );
  };

  const handleTeamEdit = (team: Team) => {
    setEditingTeam(team);
    setNewTeamName(team.name);
  };

  const handleTeamNameChange = (newName: string) => {
    setNewTeamName(newName);
    if (editingTeam) {
      setTeams(
        teams.map((team) =>
          team.id === editingTeam.id ? { ...team, name: newName } : team
        )
      );
    }
  };

  const handleQuestionClick = (
    question: Question,
    categoryIndex: number,
    questionIndex: number,
    isDoubleClick: boolean = false
  ) => {
    if (!question.isAnswered || isDoubleClick) {
      setSelectedQuestion(question);
      setSelectedCategoryIndex(categoryIndex);
      setSelectedQuestionIndex(questionIndex);
      setShowAnswer(question.isAnswered);
    }
  };

  const handleCorrectAnswer = () => {
    if (!selectedTeam) {
      toast({
        variant: "destructive",
        title: "You forgot to select a team!",
      });
      return;
    }
    if (selectedQuestion && selectedTeam) {
      setTeams(
        teams.map((team) =>
          team.id === selectedTeam.id
            ? { ...team, score: team.score + selectedQuestion.value }
            : team
        )
      );
      markQuestionAsAnswered();
    }
  };

  const handleWrongAnswer = () => {
    if (!selectedTeam) {
      toast({
        variant: "destructive",
        title: "You forgot to select a team!",
      });
      return;
    }
    if (selectedQuestion) {
      markQuestionAsAnswered();
    }
  };

  const markQuestionAsAnswered = () => {
    const newCategories = categories.map((category, categoryIndex) => ({
      ...category,
      questions: category.questions.map((q, questionIndex) =>
        categoryIndex === selectedCategoryIndex &&
        questionIndex === selectedQuestionIndex
          ? { ...q, isAnswered: true }
          : q
      ),
    }));
    setCategories(newCategories);
    setSelectedQuestion(null);
  };

  const closeDialog = () => {
    setSelectedQuestion(null);
    setShowAnswer(false);
  };

  const handleAddTeam = () => {
    const newTeam: Team = {
      id: Math.max(0, ...teams.map((t) => t.id)) + 1,
      name: `Team ${teams.length + 1}`,
      score: 0,
      emoji: getRandomEmoji(),
    };
    setTeams([...teams, newTeam]);
  };

  const handleDeleteTeam = (teamId: number) => {
    setTeams(teams.filter((team) => team.id !== teamId));
    if (selectedTeam?.id === teamId) {
      setSelectedTeam(null);
    }
    if (editingTeam?.id === teamId) {
      setEditingTeam(null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Floating Leaderboard Button */}
      <Button
        variant="outline"
        className="fixed top-4 right-4 z-50"
        onClick={() => setShowLeaderboard(true)}
      >
        🏆 Leaderboard
      </Button>

      {/* Leaderboard Dialog */}
      <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Top Teams
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto pr-2">
            <div className="space-y-3">
              {[...teams]
                .sort((a, b) => b.score - a.score)
                .map((team, index) => (
                  <div
                    key={team.id}
                    className={`flex items-center gap-3 p-2 rounded-md ${
                      selectedTeam?.id === team.id ? "bg-accent" : "bg-muted"
                    }`}
                  >
                    <span className="font-bold w-6">
                      {index === 0 ? (
                        <span className="text-yellow-500 text-2xl">🥇</span>
                      ) : index === 1 ? (
                        <span className="text-gray-400 text-2xl">🥈</span>
                      ) : index === 2 ? (
                        <span className="text-amber-700 text-2xl">🥉</span>
                      ) : (
                        `#${index + 1}`
                      )}
                    </span>
                    <span className="text-xl">{team.emoji}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium truncate">{team.name}</div>
                      <div className="font-bold">${team.score}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowLeaderboard(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold mb-4 text-[#fff]">Jeopardy!</h1>
        <div className="flex justify-between items-start gap-8">
          <div className="flex justify-center gap-4 mb-4 flex-wrap flex-1">
            {teams.map((team) => (
              <div key={team.id} className="flex flex-col items-center gap-2">
                <div className="relative group">
                  <Button
                    variant={
                      selectedTeam?.id === team.id ? "default" : "outline"
                    }
                    onClick={() => setSelectedTeam(team)}
                    onDoubleClick={() => handleTeamEdit(team)}
                    className="min-w-[120px] flex items-center gap-2"
                  >
                    <span className="text-lg">{team.emoji}</span>
                    <span>{team.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background text-red-500 hover:text-red-700 hover:bg-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTeam(team.id);
                    }}
                  >
                    ×
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span>$</span>
                  <Input
                    type="number"
                    value={team.score}
                    onChange={(e) => handleScoreEdit(team.id, e.target.value)}
                    className="w-24 text-center"
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={handleAddTeam}
                className="h-10 w-10 rounded-full"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Edit Dialog */}
      <Dialog
        open={editingTeam !== null}
        onOpenChange={(open) => !open && setEditingTeam(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="teamName">Team Name</label>
              <Input
                id="teamName"
                value={newTeamName}
                onChange={(e) => handleTeamNameChange(e.target.value)}
                placeholder="Enter team name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label>Team Emoji</label>
                <span className="text-3xl">{editingTeam?.emoji}</span>
              </div>
              <div className="border rounded-md p-2">
                <Picker
                  data={data}
                  onEmojiSelect={(emoji: { native: string }) => {
                    if (editingTeam) {
                      const newEmoji = emoji.native;
                      setTeams(
                        teams.map((team) =>
                          team.id === editingTeam.id
                            ? { ...team, emoji: newEmoji }
                            : team
                        )
                      );
                      setEditingTeam({ ...editingTeam, emoji: newEmoji });
                    }
                  }}
                  theme="dark"
                  perLine={8}
                  maxFrequentRows={1}
                  previewPosition="none"
                  skinTonePosition="none"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setEditingTeam(null)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))`,
        }}
      >
        {/* Category headers */}
        {categories.map((category, idx) => (
          <Card
            key={idx}
            className="p-2 text-center font-bold text-lg bg-[#071277] text-[#ffffff]"
          >
            {category.name.toUpperCase()}
          </Card>
        ))}

        {/* Questions grid */}
        {Array.from({ length: categories[0].questions.length }).map(
          (_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {categories.map((category, categoryIndex) => {
                const question = category.questions[rowIndex];
                return (
                  <Button
                    key={`${categoryIndex}-${rowIndex}`}
                    variant={question.isAnswered ? "ghost" : "default"}
                    className={`h-16 text-sm font-bold ${
                      question.isAnswered
                        ? "opacity-50 cursor-pointer"
                        : "bg-[#071277] hover:bg-blue-600"
                    }`}
                    onClick={() =>
                      handleQuestionClick(question, categoryIndex, rowIndex)
                    }
                    onDoubleClick={() =>
                      handleQuestionClick(
                        question,
                        categoryIndex,
                        rowIndex,
                        true
                      )
                    }
                    disabled={false}
                  >
                    <h1 className="text-[#d69f4c] text-5xl">
                      ${question.value}
                    </h1>
                  </Button>
                );
              })}
            </React.Fragment>
          )
        )}
      </div>

      {/* Question Dialog */}
      <Dialog open={selectedQuestion !== null} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">
              ${selectedQuestion?.value}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 p-4">
            <p className="text-lg">{selectedQuestion?.question}</p>
            {selectedQuestion?.image && (
              <div className="flex justify-center my-4">
                <img
                  src={selectedQuestion.image}
                  alt="Question visual"
                  className="max-w-full h-auto rounded-lg"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            )}
            {showAnswer && (
              <p className="text-lg font-bold text-blue-600">
                {selectedQuestion?.answer}
              </p>
            )}
          </div>
          <DialogFooter className="flex justify-center gap-4">
            {selectedQuestion?.isAnswered ? (
              <Button onClick={closeDialog}>Close</Button>
            ) : !showAnswer ? (
              <Button onClick={() => setShowAnswer(true)}>Show Answer</Button>
            ) : (
              <>
                <Button variant="destructive" onClick={handleWrongAnswer}>
                  Incorrect
                </Button>
                <Button variant="default" onClick={handleCorrectAnswer}>
                  Correct
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JeopardyBoard;
