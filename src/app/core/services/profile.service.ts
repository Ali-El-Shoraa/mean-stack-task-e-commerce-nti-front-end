// src/app/services/profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User, Address, ProfileData, ApiResponse } from '../../core/models/interfaces.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/profile`;

  private profileSubject = new BehaviorSubject<User | null>(null);
  private addressesSubject = new BehaviorSubject<Address[]>([]);

  profile$ = this.profileSubject.asObservable();
  addresses$ = this.addressesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ✅ جلب البروفايل كامل
  getProfile(): Observable<ProfileData> {
    return this.http.get<ApiResponse<ProfileData>>(this.apiUrl).pipe(
      map((res) => res.data),
      tap((data) => {
        this.profileSubject.next(data.profile);
        this.addressesSubject.next(data.addresses);
      }),
    );
  }

  // ✅ تحديث البيانات الشخصية
  updateMe(body: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>): Observable<User> {
    return this.http.patch<ApiResponse<User>>(`${this.apiUrl}/me`, body).pipe(
      map((res) => res.data),
      tap((user) => this.profileSubject.next(user)),
    );
  }

  // ✅ إضافة عنوان
  addAddress(address: Partial<Address>): Observable<Address> {
    return this.http.post<ApiResponse<Address>>(`${this.apiUrl}/addresses`, address).pipe(
      map((res) => res.data),
      tap((newAddress) => {
        const current = this.addressesSubject.value;
        // لو العنوان الجديد default، شيل default من الباقي
        if (newAddress.isDefault) {
          current.forEach((a) => (a.isDefault = false));
        }
        this.addressesSubject.next([newAddress, ...current]);
      }),
    );
  }

  // ✅ جلب العناوين
  getAddresses(): Observable<Address[]> {
    return this.http.get<ApiResponse<Address[]>>(`${this.apiUrl}/addresses`).pipe(
      map((res) => res.data),
      tap((addresses) => this.addressesSubject.next(addresses)),
    );
  }

  // ✅ تحديث عنوان
  updateAddress(id: string, body: Partial<Address>): Observable<Address> {
    return this.http.patch<ApiResponse<Address>>(`${this.apiUrl}/addresses/${id}`, body).pipe(
      map((res) => res.data),
      tap((updated) => {
        const current = this.addressesSubject.value.map((a) => (a._id === id ? updated : a));
        this.addressesSubject.next(current);
      }),
    );
  }

  // ✅ حذف عنوان
  deleteAddress(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/addresses/${id}`).pipe(
      map((res) => res.data),
      tap(() => {
        const current = this.addressesSubject.value.filter((a) => a._id !== id);
        this.addressesSubject.next(current);
      }),
    );
  }

  // ✅ تعيين عنوان افتراضي
  setDefaultAddress(id: string): Observable<Address> {
    return this.http.patch<ApiResponse<Address>>(`${this.apiUrl}/addresses/${id}/default`, {}).pipe(
      map((res) => res.data),
      tap(() => {
        const current = this.addressesSubject.value.map((a) => ({
          ...a,
          isDefault: a._id === id,
        }));
        this.addressesSubject.next(current);
      }),
    );
  }
}
