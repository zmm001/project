�}�� r �  �ɧg����a	����px�<�t����\�X��js^u���Fk��q�4�O�=lÖ���Ƞ*qKm�x�︗�
�ۯ�Kh��N�ΦĐ���&�M83��S��mL~����5�b�2�T��$���҄,����.J[6e��y��fٙX.���D>A4��S=��$�F׹�8m���qyYٻ:s�ҟ/a/�&��F�G�y��n���!�8�a�9Żi0�yD�A�DG��v��Z7v��I0�s&"� ,�'^�z� ͐��E����^'��$уr/�<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD'�G��W�� �<�֪��h�fMW�r+_i�$HC�I��9�.׃H|��&ܴ�P���Z
�W��i�ٶ^-�T�Ȅ2�R�d�C�]��Q��)K��6+��=�,�G� �jėlM��XOyh��Á�=�ō��m���?�j^{��7Ȯl��,>o��Wa�(��Ơ�#�а�T=���L������<�Б�I��i�GU�{Ï)��9�2��"�)���ԇ�"W2�7K�6���8�Z�Hç �DvXy�
2�B͇{o�5���n9���̀�nb8���E�<�)�$g�f�ZF��唨Jց����н�?���<1�B�7̡�/���N�4��s-W����;@�����*�a��:d��0���O�wx�q$`	\��q�U��h�V[�Q̔�%?��������֮�u�ğ*�Ҋ�oA��y� 2�M�!�	_�ط�{�9e8V�^�7	�G9!b�RZ'qOtŬ�%y(�ԡ�Jا8W��%	�}R��D��ent { { "IT_IsShow", 1 } };

            #region 老的查询条件模式
            //IMongoQuery query = null;
            //query = Query.And(
            //         Query.EQ("IT_State", 1)
            //     );
            #endregion

            return mongoCollection.FindAs<InfoTypeModel>(query).SetSortOrder(sort).ToList();
        } 
        #endregion
    }
}
