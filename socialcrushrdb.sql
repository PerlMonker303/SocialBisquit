-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2019 at 05:31 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `socialcrushrdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_comments`
--

CREATE TABLE `tbl_comments` (
  `idComment` int(11) NOT NULL,
  `idPost` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `datePosted` datetime NOT NULL,
  `content` text NOT NULL,
  `likeCount` int(11) NOT NULL,
  `parent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_comments`
--

INSERT INTO `tbl_comments` (`idComment`, `idPost`, `idUser`, `datePosted`, `content`, `likeCount`, `parent`) VALUES
(33, 2, 14, '2019-07-24 00:00:00', 'A comment for the 2nd post.', 0, 2),
(34, 1, 14, '2019-07-24 00:00:00', 'as', 0, 1),
(35, 6, 14, '2019-07-24 00:00:00', 'comment', 0, 6),
(36, 6, 14, '2019-07-24 00:00:00', 'Load some commentaaa', 0, 6),
(37, 6, 14, '2019-07-24 00:00:00', 'A third comment for the 6th post', 0, 6),
(38, 6, 14, '2019-07-24 00:00:00', 'ada1', 0, 6),
(39, 6, 14, '2019-07-24 00:00:00', 'ada2', 0, 6),
(40, 6, 14, '2019-07-24 00:00:00', 'adad3', 0, 6),
(41, 6, 14, '2019-07-24 00:00:00', 'ada4', 0, 6),
(42, 1, 14, '2019-07-24 00:00:00', '2nd comment\n', 0, 1),
(43, 1, 14, '2019-07-24 00:00:00', '3rd comment', 0, 1),
(44, 6, 13, '2019-07-24 00:00:00', 'Comment from asd user', 0, 6),
(45, 2, 13, '2019-07-24 00:00:00', 'here', 0, 2),
(46, 1, 13, '2019-07-24 16:41:39', 'most recent comment', 0, 1),
(47, 2, 13, '2019-07-24 16:48:53', 'asdd', 0, 2),
(48, 1, 14, '2019-07-27 13:48:45', 'A comment from the creator of this website.', 0, 1),
(49, 4, 14, '2019-07-27 13:49:27', 'I am the first to comment on this post.', 0, 4),
(66, 1, 13, '2019-07-27 14:21:10', 'Another comment to test out the system', 0, 1),
(67, 1, 13, '2019-07-27 15:04:27', 'aca', 0, 1),
(68, 1, 14, '2019-07-28 08:56:07', 'asa', 0, 1),
(69, 2, 14, '2019-07-28 18:22:01', 'asd', 0, 2),
(70, 1, 14, '2019-07-28 18:22:54', 'asdasd', 0, 1),
(71, 2, 14, '2019-07-28 19:15:57', 'testcomm', 0, 2),
(72, 2, 14, '2019-07-28 19:30:47', 'aa', 0, 2),
(73, 2, 16, '2019-07-30 14:17:51', 'yeah brah', 0, 2),
(74, 1, 14, '2019-08-06 17:41:21', 'comment after overlay fixing', 0, 1),
(75, 9, 14, '2019-08-22 10:57:41', 'aa', 0, 9),
(76, 3, 14, '2019-08-22 11:00:43', 'comm', 0, 3),
(77, 1, 14, '2019-08-22 12:59:59', 'comm', 0, 1),
(78, 1, 13, '2019-08-27 14:55:03', 'comm brah', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contacts`
--

CREATE TABLE `tbl_contacts` (
  `idContact` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idFriend` int(11) NOT NULL,
  `since` datetime NOT NULL,
  `is_ignored` tinyint(1) NOT NULL,
  `is_blocked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_contacts`
--

INSERT INTO `tbl_contacts` (`idContact`, `idUser`, `idFriend`, `since`, `is_ignored`, `is_blocked`) VALUES
(15, 15, 14, '2019-08-28 10:47:34', 0, 0),
(16, 14, 15, '2019-08-28 10:47:34', 0, 0),
(17, 14, 13, '2019-08-28 10:48:51', 0, 0),
(18, 13, 14, '2019-08-28 10:48:51', 0, 0),
(19, 13, 15, '2019-08-28 12:35:12', 0, 0),
(20, 15, 13, '2019-08-28 12:35:12', 0, 0),
(21, 16, 15, '2019-08-28 13:41:56', 0, 0),
(22, 15, 16, '2019-08-28 13:41:56', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback`
--

CREATE TABLE `tbl_feedback` (
  `idFeedback` int(11) NOT NULL,
  `content` text NOT NULL,
  `dateSent` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_feedback`
--

INSERT INTO `tbl_feedback` (`idFeedback`, `content`, `dateSent`) VALUES
(1, 'first feedback', '2019-08-01 10:51:38'),
(2, 'first feedback', '2019-08-01 10:51:49'),
(3, 'aaa', '2019-08-01 10:52:27'),
(4, 'a', '2019-08-01 10:53:11'),
(5, 'aca', '2019-08-01 10:53:32'),
(6, 'aa', '2019-08-01 10:53:54'),
(7, 'a', '2019-08-01 10:55:54'),
(8, 'sent feedback', '2019-08-01 10:56:49');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_frequests`
--

CREATE TABLE `tbl_frequests` (
  `idReq` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idFriend` int(11) NOT NULL,
  `dateSent` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_information`
--

CREATE TABLE `tbl_information` (
  `idInformation` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idSecretQuestion` int(11) NOT NULL,
  `secretAnswer` varchar(30) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `height` double NOT NULL,
  `gender` int(11) NOT NULL,
  `lookingFor` int(11) NOT NULL,
  `originated` varchar(40) NOT NULL,
  `location` varchar(40) NOT NULL,
  `profession` varchar(40) NOT NULL,
  `bio` text NOT NULL,
  `nameProfilePic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_information`
--

INSERT INTO `tbl_information` (`idInformation`, `idUser`, `idSecretQuestion`, `secretAnswer`, `dateOfBirth`, `height`, `gender`, `lookingFor`, `originated`, `location`, `profession`, `bio`, `nameProfilePic`) VALUES
(10, 13, 1, '$2y$10$lZSMUqsfuxLlzoqsHcRQJeN', '2000-08-07', 1.75, 1, 0, 'asd', 'asd', 'asd', 'asd', '5d31db73ef9987.24738941.png'),
(11, 14, 3, '$2y$10$3w3ugGrAmVQwsRu2qhK7eOH', '2000-08-07', 1.75, 1, 0, 'Romania', 'Romania', 'Programmer', 'Heya and welcome to my profile!', '5d31e1bb7e8389.70359746.jpg'),
(12, 15, 1, '$2y$10$rP8461vn9hvdGOUrWpXfOOA', '2019-07-30', 1.75, 1, 0, 'asd', 'asd', 'asd', 'aaaaaaa my bio is faaabulous', '5d4021a4285501.34438523.png'),
(13, 16, 1, '$2y$10$IBD50HjfdN4.lFcgFS9H2OE', '2007-06-13', 1.65, 0, 1, 'Romania', 'Romania', 'Programmer', 'Just had to make this account for debugging some bugs', '5d665a58202d85.18448976.png');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_likes`
--

CREATE TABLE `tbl_likes` (
  `idLike` int(11) NOT NULL,
  `idPost` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_likes`
--

INSERT INTO `tbl_likes` (`idLike`, `idPost`, `idUser`) VALUES
(46, 6, 14),
(75, 4, 14),
(85, 2, 14),
(86, 2, 16),
(92, 1, 14),
(103, 1, 13),
(104, 2, 13);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notifications`
--

CREATE TABLE `tbl_notifications` (
  `idNotification` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idPost` int(11) NOT NULL,
  `idUserToSee` int(11) NOT NULL,
  `typeOf` varchar(30) NOT NULL,
  `content` varchar(50) NOT NULL,
  `dateOf` datetime NOT NULL,
  `isRead` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_notifications`
--

INSERT INTO `tbl_notifications` (`idNotification`, `idUser`, `idPost`, `idUserToSee`, `typeOf`, `content`, `dateOf`, `isRead`) VALUES
(4, 13, 1, 14, 'likedPost', ' liked your post.', '2019-08-27 14:54:23', 0),
(5, 13, 2, 14, 'likedPost', ' liked your post.', '2019-08-27 14:54:47', 0),
(6, 13, 1, 14, 'commentedPost', ' commented on your post.', '2019-08-27 14:55:03', 0),
(7, 13, 1, 14, 'sharedPost', ' shared your post.', '2019-08-27 14:56:47', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_posts`
--

CREATE TABLE `tbl_posts` (
  `idPost` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `title` varchar(40) NOT NULL,
  `datePosted` date NOT NULL,
  `content` text NOT NULL,
  `observations` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_posts`
--

INSERT INTO `tbl_posts` (`idPost`, `idUser`, `title`, `datePosted`, `content`, `observations`) VALUES
(1, 14, 'asd', '2019-07-20', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 'none'),
(2, 14, 'Title1', '2019-07-20', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'none'),
(3, 14, 'Title2', '2019-07-20', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'none'),
(4, 13, 'A cool title', '2019-07-23', 'A post from asd asd.', 'none'),
(6, 14, 'Not asd', '2019-07-23', 'It\'s me, Mario!', 'none'),
(7, 15, 'asd', '2019-07-30', 'asd', 'none'),
(9, 17, 'test', '2019-08-10', 'testttt', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_questions`
--

CREATE TABLE `tbl_questions` (
  `idQuestion` int(11) NOT NULL,
  `question` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_questions`
--

INSERT INTO `tbl_questions` (`idQuestion`, `question`) VALUES
(1, 'What is your grandmother\'s first name?'),
(2, 'What was your childhood nickname?'),
(3, 'What is your oldest cousin\'s first name?'),
(4, 'what is your favorite social media website'),
(5, 'In what city or town did your mother and father meet?'),
(6, 'What is your mother\'s maiden name?');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_shares`
--

CREATE TABLE `tbl_shares` (
  `idShare` int(11) NOT NULL,
  `idPost` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `content` text NOT NULL,
  `dateShared` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_shares`
--

INSERT INTO `tbl_shares` (`idShare`, `idPost`, `idUser`, `content`, `dateShared`) VALUES
(8, 1, 14, 'aaca', '2019-07-28 09:07:08'),
(16, 4, 14, 'yeahh', '2019-07-29 14:16:47'),
(17, 6, 14, 'aa', '2019-07-29 14:20:08'),
(18, 3, 14, '111', '2019-07-29 14:20:19'),
(19, 1, 14, 'sharing this overlayed post', '2019-08-06 17:41:36'),
(20, 1, 14, 'a really really really really really really really reallyreallyreallyreallyreallyreallyreallyreally long text for sharing posts', '2019-08-06 17:42:04'),
(21, 1, 13, 'asd', '2019-08-27 14:56:46');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `idUser` int(11) NOT NULL,
  `email` varchar(40) NOT NULL,
  `fName` varchar(30) NOT NULL,
  `lName` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_reported` tinyint(1) NOT NULL,
  `is_blocked` tinyint(1) NOT NULL,
  `dateOfReg` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`idUser`, `email`, `fName`, `lName`, `password`, `is_active`, `is_reported`, `is_blocked`, `dateOfReg`, `updatedAt`) VALUES
(13, 'asd@asd.com', 'asd', 'asd', '$2y$10$shWmGQiNJbM2MPFUdzrZUOq4YwF2r7Jhn/SVQek8lgAOT9PnHyr0S', 0, 0, 0, '2019-07-19 15:21:06', '2019-07-19 18:02:12'),
(14, 'ar_alexandrescu@yahoo.com', 'Andrei-Robert', 'Alexandrescu', '$2y$10$UgHpAa7QUg2G3fdgeF9asuBwQcTpb9QG.9KwJm6mlcyfGvYuMKXTS', 0, 0, 0, '2019-07-19 18:27:20', '2019-07-19 18:28:59'),
(15, 'test@test.com', 'test', 'test', '$2y$10$K5I/zmJ4s0NklgGwsGFR6uGA2G6sKSF12QAm.guj4lkw6xegl1oNu', 0, 0, 0, '2019-07-30 13:07:29', '2019-07-30 13:53:24'),
(16, 'test@stest.com', 'asd', 'asd', '$2y$10$Ji0NACsUGYWqM9ASgHh5AO4MuCpri2tqi58A4DI0o9D2SmaGxSERW', 0, 0, 0, '2019-07-30 14:17:08', '2019-08-28 13:41:28'),
(17, 'test@yahoo.com', 'test', 'test', '$2y$10$RXo8D.E605.WTPn7XlM8pu9QBPg.nistCk1DDDXz/dP/2GDJ4WJoW', 0, 0, 0, '2019-08-10 15:49:58', '2019-08-10 15:49:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_comments`
--
ALTER TABLE `tbl_comments`
  ADD PRIMARY KEY (`idComment`);

--
-- Indexes for table `tbl_contacts`
--
ALTER TABLE `tbl_contacts`
  ADD PRIMARY KEY (`idContact`);

--
-- Indexes for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  ADD PRIMARY KEY (`idFeedback`);

--
-- Indexes for table `tbl_frequests`
--
ALTER TABLE `tbl_frequests`
  ADD PRIMARY KEY (`idReq`);

--
-- Indexes for table `tbl_information`
--
ALTER TABLE `tbl_information`
  ADD PRIMARY KEY (`idInformation`);

--
-- Indexes for table `tbl_likes`
--
ALTER TABLE `tbl_likes`
  ADD PRIMARY KEY (`idLike`);

--
-- Indexes for table `tbl_notifications`
--
ALTER TABLE `tbl_notifications`
  ADD PRIMARY KEY (`idNotification`);

--
-- Indexes for table `tbl_posts`
--
ALTER TABLE `tbl_posts`
  ADD PRIMARY KEY (`idPost`);

--
-- Indexes for table `tbl_questions`
--
ALTER TABLE `tbl_questions`
  ADD PRIMARY KEY (`idQuestion`);

--
-- Indexes for table `tbl_shares`
--
ALTER TABLE `tbl_shares`
  ADD PRIMARY KEY (`idShare`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_comments`
--
ALTER TABLE `tbl_comments`
  MODIFY `idComment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `tbl_contacts`
--
ALTER TABLE `tbl_contacts`
  MODIFY `idContact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  MODIFY `idFeedback` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_frequests`
--
ALTER TABLE `tbl_frequests`
  MODIFY `idReq` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_information`
--
ALTER TABLE `tbl_information`
  MODIFY `idInformation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_likes`
--
ALTER TABLE `tbl_likes`
  MODIFY `idLike` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `tbl_notifications`
--
ALTER TABLE `tbl_notifications`
  MODIFY `idNotification` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_posts`
--
ALTER TABLE `tbl_posts`
  MODIFY `idPost` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_questions`
--
ALTER TABLE `tbl_questions`
  MODIFY `idQuestion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_shares`
--
ALTER TABLE `tbl_shares`
  MODIFY `idShare` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
