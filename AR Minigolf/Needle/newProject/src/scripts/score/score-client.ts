import { DB_BASE_URL } from "../../constants";
import { Score } from "./Score.model";

const BASE_URL = `${DB_BASE_URL}/score`;

class ScoreClient {
    async createScore(score: Score): Promise<void> {
        try {
            await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(score)
            });
            console.log('Score created successfully');
        } catch (error) {
            console.error('Error creating score:', error);
        }
    }

    async getScores(): Promise<Score[]> {
        try {
            // get sessionId from URL
            const url = new URL(window.location.href);
            const sessionId = url.searchParams.get('sessionId');
            if (!sessionId) throw new Error('Session ID not found in URL');
            const response = await fetch(`${BASE_URL}/${sessionId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting scores:', error);
            return [];
        }
    }

    async updateScore(score: Score): Promise<void> {
        try {
            await fetch(BASE_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(score)
            });
            console.log('Score updated successfully');
        } catch (error) {
            console.error('Error updating score:', error);
        }
    }

    async deleteScore(id: string): Promise<void> {
        try {
            await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            });
            console.log('Score deleted successfully');
        } catch (error) {
            console.error('Error deleting score:', error);
        }
    }
}

export default ScoreClient;
