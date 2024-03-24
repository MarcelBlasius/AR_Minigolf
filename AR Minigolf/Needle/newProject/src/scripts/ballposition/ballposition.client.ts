import { DB_BASE_URL } from '../../constants';
import { BallPosition } from './ballposition.model';


export class BallPositionClient {
    private url = `${DB_BASE_URL}/positions`;

    public BallPositionClient() {
        const urlParams = new URLSearchParams(window.location.search);
        console.error('urlParams', urlParams);
    }

    async getBallPositions(): Promise<BallPosition[]> {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const sessionId = urlParams.get('sessionId');
            const response = await fetch(`${this.url}/${sessionId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting BallPositions:', error);
            return [];
        }
    }

    async createBallPosition(ballPosition: BallPosition): Promise<void> {
        try {
            await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ballPosition)
            });
            console.log('BallPosition created successfully');
        } catch (error) {
            console.error('Error creating BallPosition:', error);
        }
    }

    async updateBallPosition(ballPosition: BallPosition): Promise<void> {
        try {
            await fetch(this.url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ballPosition)
            });
            console.log('BallPosition updated successfully');
        } catch (error) {
            console.error('Error updating BallPosition:', error);
        }
    }
}
