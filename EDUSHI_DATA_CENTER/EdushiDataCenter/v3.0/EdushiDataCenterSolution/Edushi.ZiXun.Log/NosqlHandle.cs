�}3� r �  �d�p��R���a	����_8���=�v8�-���i��a�+>v��H�Ӡ=���<�~lN���
K�4���4Ч��߽��m���k�-�k�a~��'�3n|�S?�J~��*����v&Y7W&�һz���Ɨ�N\�J!PY�M � �Q��&GL�f��r��$*���H��hĳb<��f;D�1'��4n������䚳�^��\�+fw�=ٹ`�J������#�^gW�=P��wnżh�C&�71�(�<�;�m����O�{�m�"�%	����	�wy/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�'X���48�O���k�Z�L�Ǣ�F��MQ��[�`Z.u܏B���	�B�uT��>�Zo�΅ ���N1PҬa/t�.���ܛ#-$}L}~Y2%@	YL��*7���v���"��c�d�w&��1�Q�I�ߡ�s(O��L�E{�.x��9s���h�x��(6P����wFo�q�`g���S1��R?�^uV�Ŷ�wqC�������X�}�w�k��ͅ���7TǀJwq�s��g�{���:!�=V%%�Δ�eےa�*�ݐ6�$������,���zC�������c��1a(��#�=�I�1�Q2J�7p����:�T'~l)��X ƅ�C�GM�(��{�m�=��1W�--Z��8�..Y"���}��������앍_��u�D|�7���o�b.!�Ndt�I�gy�n���\�1�a����s�Ѵ`��,��p��Ël�T�$Ӳ{{���5p{�vbq��?�s��%���w1��<A�lD'�G���-�o�ު� �D��2�[I���y���sÑ��.��_T�'��ՊN<Ϭ(M9�����y�ێ��DW����1wh��~��Ǝՠ��*A!�a٧/4vB4��G�o��*b�%߳N��*���7�=s�W��_����I��̵���e=φɽ���,>��:.�Jg����]Rl����p��}��ĕ��ܐ���L���c�g=f�~��#��v�/���m��ߠ��gYF�KD�U�1�A�b̨ �Dv*<�Ed�|��7Q�7���(Q
������n%�A��	��)�$5�2��w���������W��\�sъgo|��7���/��K�`�{��#hw����Ccm�̳��X�,��}+̕�~�ݰY�� =jBŜS�q�������0W��������ƃ�1fu[y���Ny��b��U����H5��r�CT�ׄ����W��:�{L������o>����7>��1R�Z&'� '`�������e~y�Y MongoCollection _MongoCollection = _mongoDatabase.GetCollection(TableName.Log.ToString());

            QueryDocument query = new QueryDocument();
            query.Add("User_ID", User_ID);
            query.Add("IA_ID", IA_ID);

            SafeModeResult result = _MongoCollection.Remove(query);
            return result != null && result.Ok;
        }

        #endregion
    }
}
