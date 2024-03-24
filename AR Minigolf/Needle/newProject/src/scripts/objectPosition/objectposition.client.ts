import { DB_BASE_URL } from '../../constants';
import { ObjectPosition } from './objectposition.model';


export class ObjectPositionClient {
    private url = `${DB_BASE_URL}/positions`;

    public ObjectPositionClient() {
        const urlParams = new URLSearchParams(window.location.search);
        console.error('urlParams', urlParams);
    }

    async getObjectPositions(): Promise<ObjectPosition[]> {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const sessionId = urlParams.get('sessionId');
            const response = await fetch(`${this.url}/${sessionId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting ObjectPositions:', error);
            return [];
        }
    }

    async createObjectPosition(objectPosition: ObjectPosition): Promise<void> {
        try {
            await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objectPosition)
            });
            console.log('ObjectPosition created successfully');
        } catch (error) {
            console.error('Error creating ObjectPosition:', error);
        }
    }

    async updateObjectPosition(objectPosition: ObjectPosition): Promise<void> {
        try {
            await fetch(this.url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objectPosition)
            });
            console.log('ObjectPosition updated successfully');
        } catch (error) {
            console.error('Error updating ObjectPosition:', error);
        }
    }
}
