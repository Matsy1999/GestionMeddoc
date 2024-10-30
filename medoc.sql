-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 30 oct. 2024 à 07:21
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `medoc`
--

-- --------------------------------------------------------

--
-- Structure de la table `entrees`
--

CREATE TABLE `entrees` (
  `id` int(11) NOT NULL,
  `medicament_id` int(11) DEFAULT NULL,
  `quantite` int(11) NOT NULL,
  `date` date NOT NULL,
  `nom_medicament` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `entrees`
--

INSERT INTO `entrees` (`id`, `medicament_id`, `quantite`, `date`, `nom_medicament`) VALUES
(10, 16, 20, '2024-10-09', 'antalgique');

-- --------------------------------------------------------

--
-- Structure de la table `entrees_sorties`
--

CREATE TABLE `entrees_sorties` (
  `id` int(11) NOT NULL,
  `medicament_id` int(11) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `type` enum('entree','sortie') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `medicaments`
--

CREATE TABLE `medicaments` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `date_expiration` date DEFAULT NULL,
  `prix_unitaire` decimal(10,2) DEFAULT NULL,
  `categorie` varchar(100) DEFAULT NULL,
  `forme_pharmaceutique` varchar(50) DEFAULT NULL,
  `famille` varchar(100) DEFAULT NULL,
  `concentration` varchar(50) DEFAULT NULL,
  `date_ajout` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('actif','supprimé') DEFAULT 'actif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `medicaments`
--

INSERT INTO `medicaments` (`id`, `nom`, `date_expiration`, `prix_unitaire`, `categorie`, `forme_pharmaceutique`, `famille`, `concentration`, `date_ajout`, `status`) VALUES
(14, 'Loratadine', '2026-08-01', 2.00, 'Antihistaminique', 'Sirop', 'Antiallergique', '10 mg', '2024-10-29 16:10:44', 'actif'),
(15, 'nounou', '2024-10-18', 3.20, 'jiji', 'carrer', 'nounou', '10mg', '2024-10-29 19:05:56', 'actif'),
(16, 'toto', '2024-10-04', 30.00, 'dede', 'rond', 'koko', '300ml', '2024-10-30 05:12:58', 'actif'),
(17, 'Paraphyse', '2024-10-03', 100.00, 'Analgegisue', 'Poudre', 'aspegic', '100mg', '2024-10-30 05:26:17', 'actif');

-- --------------------------------------------------------

--
-- Structure de la table `sorties`
--

CREATE TABLE `sorties` (
  `id` int(11) NOT NULL,
  `medicament_id` int(11) DEFAULT NULL,
  `quantite` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sorties`
--

INSERT INTO `sorties` (`id`, `medicament_id`, `quantite`, `date`) VALUES
(4, 11, 600, '2024-11-03');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `entrees`
--
ALTER TABLE `entrees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entrees_ibfk_1` (`medicament_id`);

--
-- Index pour la table `entrees_sorties`
--
ALTER TABLE `entrees_sorties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicament_id` (`medicament_id`);

--
-- Index pour la table `medicaments`
--
ALTER TABLE `medicaments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sorties`
--
ALTER TABLE `sorties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicament_id` (`medicament_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `entrees`
--
ALTER TABLE `entrees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `entrees_sorties`
--
ALTER TABLE `entrees_sorties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `medicaments`
--
ALTER TABLE `medicaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `sorties`
--
ALTER TABLE `sorties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `entrees_sorties`
--
ALTER TABLE `entrees_sorties`
  ADD CONSTRAINT `entrees_sorties_ibfk_1` FOREIGN KEY (`medicament_id`) REFERENCES `medicaments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
