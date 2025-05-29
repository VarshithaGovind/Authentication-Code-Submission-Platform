const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Sample exercises data (you can replace this with database calls)
const exercises = [
    {
        id: 1,
        title: 'Hello World',
        description: 'Write your first program to display "Hello, World!"',
        difficulty: 'Easy',
        status: 'not-started'
    },
    {
        id: 2,
        title: 'Variables and Data Types',
        description: 'Learn about different data types and how to use variables',
        difficulty: 'Easy',
        status: 'not-started'
    },
    {
        id: 3,
        title: 'Control Structures',
        description: 'Master if-else statements and loops',
        difficulty: 'Medium',
        status: 'not-started'
    },
    {
        id: 4,
        title: 'Functions',
        description: 'Create and use functions effectively',
        difficulty: 'Medium',
        status: 'not-started'
    },
    {
        id: 5,
        title: 'Arrays and Objects',
        description: 'Work with complex data structures',
        difficulty: 'Medium',
        status: 'not-started'
    },
    {
        id: 6,
        title: 'Error Handling',
        description: 'Learn how to handle errors gracefully',
        difficulty: 'Hard',
        status: 'not-started'
    },
    {
        id: 7,
        title: 'Asynchronous Programming',
        description: 'Master promises and async/await',
        difficulty: 'Hard',
        status: 'not-started'
    },
    {
        id: 8,
        title: 'DOM Manipulation',
        description: 'Interact with HTML elements using JavaScript',
        difficulty: 'Medium',
        status: 'not-started'
    },
    {
        id: 9,
        title: 'API Integration',
        description: 'Learn to work with external APIs',
        difficulty: 'Hard',
        status: 'not-started'
    },
    {
        id: 10,
        title: 'Final Project',
        description: 'Build a complete application using all concepts',
        difficulty: 'Hard',
        status: 'not-started'
    }
];

// Get all exercises
router.get('/', auth, async (req, res) => {
    try {
        console.log('Fetching exercises for user:', req.user.id);
        
        // In a real application, you would fetch user-specific exercise progress
        // For now, we'll return the static exercises
        res.json(exercises);
    } catch (err) {
        console.error('Error fetching exercises:', err);
        res.status(500).json({ msg: "Server error while fetching exercises" });
    }
});

// Get specific exercise
router.get('/:id', auth, async (req, res) => {
    try {
        const exerciseId = parseInt(req.params.id);
        const exercise = exercises.find(ex => ex.id === exerciseId);
        
        if (!exercise) {
            return res.status(404).json({ msg: "Exercise not found" });
        }
        
        res.json(exercise);
    } catch (err) {
        console.error('Error fetching exercise:', err);
        res.status(500).json({ msg: "Server error while fetching exercise" });
    }
});

module.exports = router;