�}:� r �	  �ǀ�Q�>���a	��*��px�<�t����\�X��js^u���Fk��q�4�O�=lÖ���Ƞ*qK��Y�|D�Tm��	6��0�4[���)��)k�$����RǴF8�N{b?��N�E'��q/Y��8W-MA�jn�A^YܗM�]�`AAࠟ�[`���hE]�o�	���k������W�ƨfj�{q��m���a F/m�~�`�逢m�y~%Z�a��*��"{>$���f���r�L��Ќ"�#-'���%�k�f?��eˣ,�m��}�Vժ�l��c�G�n�XT�>��q�?�*���v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l '4�Ys��^���!���9�Q�Х%�t��ҽ���$M�+[yx�M�8\Do�۵��U�l�	C�S���b��� E��ð�Cf����;��Q����e�8Z���KTtS"����u��*�����*��9>��`lx��*�L$����hU}��i�z#םy��&���N�5X??����1 j�T���yk�o���x��Rb	j�L�/�!�a����&��>-����#���C���d{m�����vK�)~H^��<a���1�˨kcA3��+�M�fAA�ϩ���&��a��}�F�
�x�_�.���xH �c����)��ATFk�<��TG�92�[�!c$T_�k%�|��~�C���9k�Y6���}���fUo�'��a|�<�)�F0�c���{� ���`�\C/�Kf��(�He.$���*��JL���f�~Þ8�By��R�7�%B�,x~�@��~�A�O$}��Kh�P��条件模式
            //IMongoQuery query = null;
            //query = Query.And(
            //         Query.EQ("IT_State", 1)
            //     );
            #endregion

            return mongoCollection.FindAs<WenDaInfoTypeModel>(query).SetSortOrder(sort).ToList();
        } 
        #endregion
    }
}
