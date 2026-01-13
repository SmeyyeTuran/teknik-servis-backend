import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore'; // Bu satırı ekleyin
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestsService {
  private readonly collection = 'service_requests';

  async create(createRequestDto: CreateRequestDto) {
    const db = getFirestore(); // FirebaseService yerine getFirestore()
    const docRef = await db.collection(this.collection).add({
      ...createRequestDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { id: docRef.id, ...createRequestDto };
  }

  async findAll() {
    const db = getFirestore(); // FirebaseService yerine getFirestore()
    const snapshot = await db.collection(this.collection).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const db = getFirestore(); // FirebaseService yerine getFirestore()
    const doc = await db.collection(this.collection).doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, updateRequestDto: UpdateRequestDto) {
    const db = getFirestore(); // FirebaseService yerine getFirestore()
    await db.collection(this.collection).doc(id).update({
      ...updateRequestDto,
      updatedAt: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const db = getFirestore(); // FirebaseService yerine getFirestore()
    await db.collection(this.collection).doc(id).delete();
    return { message: 'Request deleted successfully' };
  }

  async findByUserId(userId: string) {
    const db = getFirestore(); // FirebaseService yerine getFirestore()
    const snapshot = await db
      .collection(this.collection)
      .where('userId', '==', userId)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}