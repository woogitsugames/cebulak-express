import type { GameLocale } from './schema';

/** Teksty gry: francuski. */
export default {
  "COUNTRY_NAME": {
    "BE": "Belgique",
    "NL": "Pays-Bas",
    "DE": "Allemagne",
    "UK": "Royaume-Uni",
    "FR": "France",
    "CH": "Suisse",
    "NO": "Norvège",
    "DK": "Danemark",
    "SE": "Suède",
    "PL": "Pologne"
  },
  "COUNTRY_LOCATIVE": {
    "BE": "en Belgique",
    "NL": "aux Pays-Bas",
    "DE": "en Allemagne",
    "UK": "au Royaume-Uni",
    "FR": "en France",
    "CH": "en Suisse",
    "NO": "en Norvège",
    "DK": "au Danemark",
    "SE": "en Suède",
    "PL": "en Pologne"
  },
  "OBSTACLE_NAME": {
    "viaduct": "Pont trop bas",
    "sign": "Panneau géant",
    "crane": "Grue de chantier",
    "roadworks": "Travaux routiers",
    "barrier": "Barrière",
    "truck": "Camion",
    "ground": "Asphalte"
  },
  "FAIL_JOKES": {
    "viaduct": [
      "Les valises sur le toit voulaient mieux voir.",
      "Le pont a vérifié la hauteur. Très précisément.",
      "La voiture passait. Les valises avaient un autre avis.",
      "La valise du dessus a vu le pont en premier.",
      "La carte avait oublié quelques centimètres.",
      "Hauteur de la voiture : optimiste. Pont : inflexible.",
      "Un bocal de trop sur le toit.",
      "La galerie de toit réclame un itinéraire plus bas."
    ],
    "sign": [
      "Le panneau disait tout droit. La voiture a entendu en haut.",
      "Grand panneau. Projet de voyage encore plus grand.",
      "Bonne direction, mauvaise altitude.",
      "Le panneau voulait voir les bocaux de près.",
      "Le panneau prévenait. Nous comptions les bocaux.",
      "Le raccourci n'avait pas l'accord du panneau.",
      "Ce panneau a très bien indiqué la fin du voyage.",
      "La carte montrait la route, pas le panneau."
    ],
    "crane": [
      "La grue avait son plan. Le break aussi.",
      "Travaux en hauteur. Au sens propre.",
      "Le chantier continue. Pas notre trajet.",
      "On surveillait la route. La grue voyait tout d'en haut.",
      "Tout montait sur le chantier, sauf notre marge.",
      "Le break a croisé une grue. D'un peu trop près.",
      "Quelqu'un a levé une poutre. Nous, les sourcils.",
      "Mieux vaut croiser une grue autour d'un café."
    ],
    "roadworks": [
      "Travaux. Déviation : 40 km de plus.",
      "Les cônes tenaient bon. Nous, un peu moins.",
      "L'asphalte se refait une beauté. Notre humour tient.",
      "Du bitume neuf ? Encore faut-il le trouver.",
      "Du ruban partout, aucun raccourci.",
      "Sur la carte, autoroute. En vrai, slalom.",
      "Le café a fini avant les travaux.",
      "Encore un détour. Les bocaux connaissent l'Europe."
    ],
    "barrier": [
      "La barrière a choisi le mauvais moment pour fermer.",
      "Ticket en poche. Pas assez de place.",
      "Le break voulait passer. La barrière voulait rester.",
      "À la barrière : patience et freinage.",
      "La barrière est tombée avant la fin du café.",
      "Plan : passer sans s'arrêter. Résultat : recommencer.",
      "Les bagages du toit n'étaient pas sur la liste.",
      "Tout était prêt, sauf la barrière."
    ],
    "truck": [
      "Le camion était plus près que dans le rétro.",
      "Il manquait juste la place d'un sac.",
      "Le break et le camion visaient le même bout de route.",
      "Le camion transportait peut-être un colis de maman.",
      "Le camion a pris la voie. Nous, le bouton Rejouer.",
      "Tous les raccourcis ne sont pas faits pour ce break.",
      "De la place sur la route, pas pour cette manœuvre.",
      "Les valises ont fait un signe d'adieu."
    ],
    "ground": [
      "La gravité adore les voitures bien chargées.",
      "Atterrissage en douceur ? C'était prévu, pourtant.",
      "La gravité vient réclamer son dû.",
      "Bocaux intacts ! Les suspensions ne sont pas d'accord.",
      "L'asphalte était plus près que prévu.",
      "Encore un saut et c'était parfait.",
      "Les valises sont prêtes pour un nouvel essai.",
      "Retour sur terre. Au sens propre."
    ]
  },
  "PICKUP_TOAST": {
    "parcel": "Colis de maman ! +{km} km",
    "jar": "Bocal de cornichons ! +{km} km"
  },
  "BORDER_TEXTS": {
    "BE": [
      "Bienvenue en Belgique ! Les valises sont impeccables.",
      "Belgique ! Un café à emporter et on repart.",
      "Entrée en Belgique. Les bagages suivent.",
      "Belgique sur le trajet ! Encore de la route."
    ],
    "NL": [
      "Bienvenue aux Pays-Bas ! Vélos au bord des canaux.",
      "Pays-Bas ! Admirons les canaux un instant.",
      "Entrée aux Pays-Bas. Le toit est toujours plein.",
      "Pays-Bas en vue. Le café est encore chaud."
    ],
    "DE": [
      "Bienvenue en Allemagne ! Le voyage continue.",
      "Allemagne ! Un kilomètre de plus vers la maison.",
      "Entrée en Allemagne. Tous les bocaux sont là.",
      "Allemagne sur la route. Valises pleines d'espoir."
    ],
    "UK": [
      "Bienvenue au Royaume-Uni ! Les valises suivent.",
      "Royaume-Uni ! Un café et on repart.",
      "Entrée au Royaume-Uni. Attention aux voies.",
      "Royaume-Uni sur le trajet. Cap sur la maison."
    ],
    "FR": [
      "Bienvenue en France ! Les bocaux sont à bord.",
      "France ! Un café, et la pause est parfaite.",
      "Entrée en France. Tous les sacs sont attachés.",
      "France sur la route. Profitons du paysage."
    ],
    "CH": [
      "Bienvenue en Suisse ! Vue sur les montagnes offerte.",
      "Suisse ! Même les valises admirent les sommets.",
      "Entrée en Suisse. On garde le cap.",
      "Suisse sur la route. Le toit est toujours occupé."
    ],
    "NO": [
      "Bienvenue en Norvège ! Les fjords défilent.",
      "Norvège ! Un break et une vue magnifique.",
      "Entrée en Norvège. Un café ne ferait pas de mal.",
      "Norvège sur la route. Tous les sacs sont là."
    ],
    "DK": [
      "Bienvenue au Danemark ! On suit la carte.",
      "Danemark ! Pont après pont, plus près de la maison.",
      "Entrée au Danemark. Valises toujours sur le toit.",
      "Danemark sur le trajet. Le café reste chaud."
    ],
    "SE": [
      "Bienvenue en Suède ! Des routes parmi les arbres.",
      "Suède ! Les bocaux voyagent avec vue.",
      "Entrée en Suède. Les ponts nous attendent.",
      "Suède sur la route. Le compteur continue."
    ],
    "PL": [
      "Pologne ! Encore un peu et on est à la maison.",
      "Bienvenue en Pologne ! Maman attend sûrement.",
      "Entrée en Pologne. Les bocaux approchent du but.",
      "Pologne sur la route ! Les pierogi approchent."
    ]
  },
  "ARRIVAL_TEXTS": [
    "Tu es à la maison ! Maman met déjà la table.",
    "Fin du trajet. Début du deuxième service.",
    "Les valises sont dans la voiture, le repas est prêt.",
    "Maman demande : « Tu as faim ? » Ce n'est pas une question.",
    "Des pierogi sur la table, la moitié de la maison dans le coffre.",
    "Arrivé ! Le thé refroidit, tout le monde attend.",
    "Le break se repose. Le repas de famille commence.",
    "Arrivée ! D'abord les câlins, ensuite le rab.",
    "Trajet réussi. Maman sort une assiette de plus.",
    "On comptait les kilomètres. Maintenant, les pierogi.",
    "Maman prépare déjà les bocaux pour le retour.",
    "Pas encore déballé, les bocaux du retour sont prêts.",
    "Te voilà chez toi. Ça sent bon le repas.",
    "Clés posées. Il est temps de passer à table."
  ],
  "NEAR_MISS_TEXTS": [
    "C'était juste ! Même le rétro n'a pas bougé.",
    "Un centimètre de marge. C'est une victoire.",
    "Ouf ! Les bocaux ont retenu leur souffle.",
    "À un cheveu ! Le toit est toujours là.",
    "Ouf ! Les valises n'ont rien remarqué.",
    "Encore un peu et c'était un raccourci... vers le menu.",
    "Presque ! Le break est passé sur la pointe des pneus.",
    "De justesse ! Le café est resté dans la tasse.",
    "Ça passe. Ne demande pas comment.",
    "Ce n'était pas une manœuvre, c'était de la précision.",
    "De justesse ! Même la carte s'est tue.",
    "À un cheveu ! Le prochain virage sera plus calme."
  ],
  "PICKUP_TEXTS": {
    "parcel": [
      "Colis de maman ! +{km} km",
      "Colis sur le toit ! +{km} km",
      "Encore un colis ? +{km} km",
      "Colis embarqué. Le toit tient ! +{km} km",
      "Un colis de chez nous ? Oui ! +{km} km",
      "Nouveau bagage, nouveau record ? +{km} km",
      "Les valises ont fait de la place. +{km} km",
      "Colis surprise ! +{km} km"
    ],
    "jar": [
      "Bocal de cornichons ! +{km} km",
      "Bocal attrapé ! +{km} km",
      "Encore un bocal ! +{km} km",
      "Le couvercle tient. +{km} km",
      "Un bocal pour la collection ! +{km} km",
      "Les réserves augmentent ! +{km} km",
      "Attention, c'est du verre ! +{km} km",
      "Pas une rayure. +{km} km"
    ]
  },
  "MILESTONE_TEXTS": [
    "{km} km ! Café bien mérité.",
    "{km} km ! Toit toujours plein.",
    "{km} km ! Les sacs ne râlent pas.",
    "{km} km ! Le repas se rapproche.",
    "{km} km ! Le compteur travaille.",
    "{km} km ! Plus près de la table familiale.",
    "{km} km ! Cap toujours sur la maison.",
    "{km} km ! Bocaux en première classe.",
    "{km} km ! La carte confirme.",
    "{km} km ! Même les valises sont fières.",
    "{km} km ! L'asphalte défile.",
    "{km} km ! Pause ? Encore un peu.",
    "{km} km ! Toit complet.",
    "{km} km ! On sent presque les pierogi.",
    "{km} km ! Virage après virage.",
    "{km} km ! Le café peut nous attendre.",
    "{km} km ! Belle journée pour le break.",
    "{km} km ! Le coffre tient bon.",
    "{km} km ! Encore le temps de chanter.",
    "{km} km ! La maison se dessine."
  ],
  "WIGILIA_TEXTS": [
    "À la maison pour le réveillon ! La soupe attend.",
    "Les pierogi attendent. Les bocaux aussi voyagent.",
    "Pour le réveillon ! N'oublie pas ton écharpe.",
    "La table et les petits raviolis approchent.",
    "Vitres froides, pensées chaleureuses pour la maison.",
    "Trajet d'hiver. Coffre rempli à ras bord.",
    "Pour le réveillon ! Une assiette en plus est prête.",
    "Route blanche ? Si possible, juste sur la carte.",
    "Encore quelques kilomètres avant le pain d'épices.",
    "Cadeaux à bord. Et trois sacs « au cas où ».",
    "Pour le réveillon ! Le thermos a le dernier mot.",
    "Voyage d'hiver. Chauffage et bonne humeur au top.",
    "Le chou aux champignons doit déjà nous attendre.",
    "Pour le réveillon ! Les valises veulent rentrer.",
    "La plus belle vue ? Une fenêtre éclairée chez nous.",
    "Long trajet, liste de plats encore plus longue.",
    "Neige dehors, pierogi en tête.",
    "Pour le réveillon ! Sans détour, ce serait trop simple."
  ],
  "UI": {
    "tapToStart": "Touchez pour démarrer",
    "tapToFly": "Touchez pour sauter",
    "remaining": "maison dans {km} km",
    "welcome": "Bienvenue {where} !",
    "over": "Fin du trajet !",
    "arrived": "Tu es à la maison !",
    "arrivedSub": "Maman met déjà la table.",
    "stoppedBy": "Arrêté par : {what}",
    "distance": "{km} km",
    "best": "Record : {km} km",
    "newBest": "Nouveau record !",
    "again": "Rejouer",
    "share": "Partager",
    "modeRanked": "Classement",
    "modeCozy": "Détente",
    "shareText": "J'ai parcouru {km} km de {from} vers {to} ! À toi de jouer !",
    "shareArrivedText": "De {from} à {to} en {sec} s ! Et toi ?",
    "daily": "Défi du jour",
    "dailyHint": "Même trajet pour tous : {title}",
    "league": "Ligue de la diaspora polonaise",
    "close": "Fermer",
    "portal": "Quoi de neuf dans la communauté polonaise {where} ?",
    "updateReady": "Nouvelle version prête — chargement depuis le menu.",
    "garage": "Garage",
    "garageClose": "Fermer le garage",
    "garageEyebrow": "Choisis ton équipage",
    "garageSkin": "Choisir un véhicule",
    "garageDefaultSkin": "Conducteur du break",
    "garagePanCebulek": "Monsieur Cebulek",
    "garagePaniCebulka": "Madame Cebulka",
    "garageBusKurierski": "Fourgonnette de livraison",
    "garagePrevious": "Apparence précédente",
    "garageNext": "Apparence suivante",
    "garageNick": "Ton pseudo au classement",
    "garageGender": "Accord grammatical du pseudo",
    "garageMale": "Conducteur",
    "garageFemale": "Conductrice",
    "garageNickHint": "Choisis un pseudo proposé. Aucune donnée à saisir.",
    "garageNickChoices": "Idées de pseudos",
    "garageShuffle": "Autres propositions"
  },
  "MENU": {
    "tagline": "Direction la Pologne",
    "homeLabel": "Pays de résidence",
    "fromLabel": "Ville de départ",
    "toLabel": "Je vais à",
    "modeLabel": "Mode de jeu",
    "start": "C'est parti !",
    "garageButton": "Garage : personnage et pseudo",
    "backToMenu": "Changer de trajet",
    "gameLabel": "Jeu Cebulak Express"
  }
} satisfies GameLocale;
