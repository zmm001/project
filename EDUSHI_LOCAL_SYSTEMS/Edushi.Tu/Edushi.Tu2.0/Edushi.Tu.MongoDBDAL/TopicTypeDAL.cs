�}c� r �!  t��{ n=��a	���#^���}ꬱ���f�
��F����C���VLwnJ�����X،DQ�p(�+md��C1&:h��Bմ\���R�K�F�"� �k��l����4���\S�b�{�f�N<AaW�G+���$�M�-��Ě���}@A}�i�g���"��='�Z���kS�e�6�Y+�e�s�A�P����\�]��K��Ð1؄r��v	y��
e�\j��j�=�}�5Űo��*q��.9e��� ���5�>�fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�(O��|M҉(b}��B��2��B �H�̄t&s�һ�p����u���Z6<t��|t1���v,-��k��֙�	�XƆ��f˔�F�2s Rv�d��.Lm�]���"��I��!��8��Ό[M�L�e#̐�=)�%s:��}���ÙwA�����6�lq+���F�����f�s�R^u��ed��/e���DB�	דհ�UA#�h#Բ��!��1葈�����z��;ET~Ρ�5q��늟�W�>�]M;M
�}"Q��x8�4\(��!�HG�]�����T2D_���K�**}1:x�`G*�����)ԘG���o;:`�}��L8�����;m�ZN4U��5?5bG 7U��tq����f[G�d����oI)iyϧ�}��Y��*�-�q�]V.�k�֣�5�>��߷�_Kx��t_~�^���t��xk�'$x��:��t���P2���~v8Mߩ��4r�:�K[��%�Tg�����B�nt query = new QueryDocument();
            query.Add("TT_State", 1);

            return _mongoCollection.FindAs<TopicTypeModel>(query).SetSortOrder(sort).ToList();
        }
        #endregion
    }
}
