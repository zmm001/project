�}h� r �  œ˯����a	��W��_���}�n��S
���爭aA�Cyqp��%��G��~��u���ۍ\3�Sw	46��k�ٷ���&K�m�K}�5[S���+��gI�`�=�t�k��^��9\�ں�jj��\ԕ�^�J5抨]�5:��_M��� ���j�T2f�������&%c�Ee#Λm���j �̋����r@��)/����_<��$���I�X4IVR6�Z�Z+�*q��C�{�y�x�+:�Xg�\M�����&u��sו���}�bŰ����c�x֋�I{��Gm�,"{���Q����܅��w}�Vo�Rfuޤh���6o�S��.7�.�O�hh�;Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�&5��&���ۋӿc�<���Xr��1��|� �˼PT�uRA~F}�wL���W����0c͑w��dPJ�=-����7�k�N��8�]���(R����>Yq���rW��U�7��I�c�dG�KiJ��J�mCE�)\U��a���������*Wz��A��
|�$�ꥠh ��r��h�����B5i��~��ȝ��N,���[ӕ�i�	4�hQ�H���@��BJ%�n���2�?�e���Jncv�gLa���5K3�i|���ʜ`F3���n���G���*�:��Y�*W���3��0RL�a:��Н߻���1���8�n����n]��*��lCm����+�hxt4��y�na.�`��W8�@�V��c`fz}iL6.������k���˥����G��k�Rd8�뉘�19;�FF�f+�6���3�G�xJ����e�K�ŌH��<����;�[��TE���5~�Z?w��^����%���,w�|.
зC��%l�l�#F��A?-A��%�Q���dR�^f6\%�`��׃P�e�OIi�F�+�jY��Y�zv$ڢߢ�?o����6���(�s�L����wj=J�F��,>?���߄���[-�n�c����"#V��`�(�������"ߔ��u�|:7c&���D��o"7`~J
�&�;��bf�����&��1H&���CD�
"o� �jw˅�`{x�)�)�*���G����e�^����rS���u�ܸ�8l̭��Ok�;}1g�;�to@��[�)&%b0{���[��q�'�&�Yȅ�\�s0k�x�f�E,�r��D��"��m��Hgqx�_�?Y�ej|�ԣgL2S�e ��[vZ��=T���񋁤�g�!>c�k�g��JD9�1G��6���0�D�p���uѶNO����:D4(#�%/�%hU�;a���ﶥ�������e���б�*��L�E\�}���"��.)b�����<��k�`b�U��^
�k�����+�pP���d ��$��Ոfl� �<�H͐�L1����q�&�*�����}ox $�SZ/s�	M��f6%)%��y�r'�h�N���D���v4S$��ǿ&Gj�Xaѻ+ ܐ$Chџ=��pG�򦪿_V��0��3~`����kA���[[<v �x-%�Hߩ��_����f���[�S�i��+oY��A�j�	X�|~:wu�ٷ��f�'�mҋi�$]#��Qq��N*���U��U9�|�fLV�[5���4�*.������\]v��*>�Р��ơPϦ��/l.�W:{KW�Q"��F8�SW#�}�&������H#j��c+�����z-���B=;���gȒ�<�[Lq�<(�$���K&���%2����/�(�Ƽ��W)��h+N�h�ޝ:�Y:r��,aMuwY�A��F1��a9����l�s��l[�}Ъ"��C�����^%ϒa�������Ş���{h^�N:�5�� ���Lc���|�=1�y��ġ��Jk땱���+I׈��!x<param name="documentType">The nominal type of the modified document.</param>
        /// <returns>The modified document.</returns>
        public object GetModifiedDocumentAs(Type documentType)
        {
            var document = ModifiedDocument;
            return (document == null) ? null : BsonSerializer.Deserialize(document, documentType);
        }
    }
}
